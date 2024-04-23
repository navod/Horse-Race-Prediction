import json
import unittest
from unittest.mock import MagicMock, patch

from tests import set_up


class TestIntegration(unittest.TestCase):
    def setUp(self):
        self.app, self.client, self.test_token = set_up()

    @patch('models.User.User.get_user_by_id')
    @patch('controllers.integration_controller.check_api_key_valid')
    def test_create_connection_success(self, mock_check_api_key_valid, mock_get_user_by_id):
        # Mocking dependencies
        return_value = {'user_id': 1, 'api_key': "adsa2323"}
        mock_user = MagicMock()
        mock_get_user_by_id.return_value = mock_user
        mock_integration = MagicMock()
        mock_response = MagicMock(status_code=200, json=lambda: {'mocked_data': 'mocked_value'})
        mock_check_api_key_valid.return_value = (mock_integration, mock_response)

        # Calling the function
        response = self.client.post('/integration/create-connection', data=json.dumps(return_value),
                                    content_type='application/json',
                                    headers={'Authorization': f'Bearer {self.test_token}'})

        self.assertEqual(response.status_code, 200)

    @patch('models.Integration.Integration.get_api_key_by_user_id')
    @patch('models.Integration.Integration.delete')
    def test_delete_connection_success(self, mock_integration_delete, mock_get_api_key_by_user_id):
        # Mocking dependencies
        mock_integration = MagicMock()
        mock_get_api_key_by_user_id.return_value = mock_integration

        # Calling the function
        response = self.client.delete('/integration/delete-connection?:user_id=1',
                                      content_type='application/json',
                                      headers={'Authorization': f'Bearer {self.test_token}'})

        # Asserting the expected behavior
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), {"message": "Integration deleted successfully"})
        mock_integration_delete.assert_called_once_with(mock_integration)  # Check if delete method was called

