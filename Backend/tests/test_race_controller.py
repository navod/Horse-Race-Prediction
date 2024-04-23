import unittest
from unittest.mock import patch

from gevent.testing import params

from models.Integration import Integration
from tests import set_up
from utility.test_data import get_test_races, get_test_race


class TestRace(unittest.TestCase):
    def setUp(self):
        self.app, self.client, self.test_token = set_up()

    @patch('controllers.race_controller.get_current_user')
    @patch('models.Integration.Integration.get_api_key_by_user_id')
    @patch('controllers.race_controller.get_rapid_data')
    def test_get_all_race_cards_success(self, mock_get_rapid_data, mock_get_api_key_by_user_id, mock_get_current_user):
        # Mocking dependencies
        mock_user = {'id': 1}
        mock_get_current_user.return_value = mock_user
        mock_integration = Integration()
        mock_integration_schema = {'mocked_integration_data': 'mocked_value'}
        mock_get_api_key_by_user_id.return_value = mock_integration
        mock_get_rapid_data.return_value = {'mocked_race_cards': get_test_races()}

        # Calling the function
        response = self.client.get('/races/all',
                                   headers={'Authorization': f'Bearer {self.test_token}'},
                                   content_type='application/json')

        self.assertEqual(response.status_code, 200)

    @patch('utility.utility.get_current_user')
    def test_get_all_race_cards_exception(self, mock_get_current_user):
        # Mocking dependencies
        mock_user = {'id': 1}
        mock_get_current_user.return_value = mock_user

        # Simulating an exception
        def raise_exception(*args, **kwargs):
            raise Exception("Test Exception")

        with patch('models.Integration.Integration.get_api_key_by_user_id', side_effect=raise_exception):
            # Calling the function
            response = self.client.get('/races/all',
                                       headers={'Authorization': f'Bearer {self.test_token}'},
                                       content_type='application/json')

        # Asserting the expected behavior
        self.assertEqual(response.status_code, 500)  # Check status code

    @patch('controllers.race_controller.get_current_user')
    @patch('models.Integration.Integration.get_api_key_by_user_id')
    @patch('controllers.race_controller.get_rapid_race_detail')
    def test_get_race_detail_success(self, mock_get_rapid_race_detail, mock_get_api_key_by_user_id,
                                     mock_get_current_user):
        # Mocking dependencies
        mock_user = {'id': 1}
        mock_get_current_user.return_value = mock_user
        mock_integration = Integration()
        mock_integration_schema = {'mocked_integration_data': 'mocked_value'}
        mock_get_api_key_by_user_id.return_value = mock_integration
        mock_get_rapid_race_detail.return_value = {'mocked_race_detail': get_test_race()}

        # Calling the function
        response = self.client.get('/races/race?:1',
                                   headers={'Authorization': f'Bearer {self.test_token}'},
                                   content_type='application/json')

        self.assertEqual(response.status_code, 200)

