import json
import unittest
from unittest.mock import patch, MagicMock

from models.User import User
from tests import set_up


class TestAuth(unittest.TestCase):
    def setUp(self):
        self.app, self.client, self.test_token = set_up()

    @patch('models.User.User.get_user_by_email')
    @patch('controllers.auth_controller.generate_uuid')
    @patch('models.User.User.save')
    def test_register_user(self, mock_save, mock_generate_uuid, mock_get_user_by_email):
        # Mocking dependencies
        mock_get_user_by_email.return_value = None
        mock_generate_uuid.return_value = 'mocked_uuid'

        # Simulating request data
        request_data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "password": "password123",
            "role": "customer"
        }

        # Calling the function
        response = self.client.post('/auth/register', data=json.dumps(request_data),
                                    content_type='application/json')

        # Asserting the expected behavior
        mock_save.assert_called_once()  # Ensure save method was called
        self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.data), {"message": "User created"})

    @patch('models.User.User.get_user_by_email')
    def test_register_user_existing_email(self, mock_get_user_by_email):
        # Mocking dependency
        mock_get_user_by_email.return_value = MagicMock()

        # Simulating request data
        request_data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "password": "password123"
        }

        response = self.client.post('/auth/register', data=json.dumps(request_data),
                                    content_type='application/json')

        self.assertEqual(response.status_code, 409)
        self.assertEqual(json.loads(response.data), {"error": "User already exists"})

    @patch('models.User.User.get_user_by_email')
    @patch('models.User.User.check_password')
    @patch('models.Integration.Integration.get_api_key_by_user_id')
    @patch('controllers.auth_controller.create_access')
    @patch('controllers.auth_controller.create_refresh')
    def test_login_user(self, mock_create_refresh_token, mock_create_access_token,
                        mock_get_api_key_by_user_id, mock_check_password, mock_get_user_by_email):
        # Mocking dependencies
        mock_get_user_by_email.return_value = User()
        mock_check_password.return_value = True
        mock_get_api_key_by_user_id.return_value = 'mocked_api_key'
        mock_create_access_token.return_value = 'mocked_access_token'
        mock_create_refresh_token.return_value = 'mocked_refresh_token'

        # Simulating request data
        request_data = {
            "email": "john.doe@example.com",
            "password": "password123"
        }

        # Calling the function
        response = self.client.post('/auth/login', data=json.dumps(request_data),
                                    content_type='application/json')

        json_resp = json.loads(response.data)
        # Asserting the expected behavior
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json_resp['message'], "Logged In ")

    @patch('models.User.User.get_user_by_email')
    @patch('models.User.User.check_password')
    def test_login_user_invalid_credentials(self, mock_check_password, mock_get_user_by_email):
        # Mocking dependencies
        mock_get_user_by_email.return_value = User()
        mock_check_password.return_value = False

        # Simulating request data
        request_data = {
            "email": "john.doe@example.com",
            "password": "password123"
        }

        # Calling the function
        response = self.client.post('/auth/login', data=json.dumps(request_data),
                                    content_type='application/json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(json.loads(response.data), {"error": "Invalid email or password"})
