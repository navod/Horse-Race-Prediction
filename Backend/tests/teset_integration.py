import json
import unittest
from unittest.mock import patch, MagicMock

from flask_jwt_extended import create_access_token

from app import create_app


class TestIntegration(unittest.TestCase):
    def setUp(self):
        self.app = create_app({
            "TESTING": True,
            "SQLALCHEMY_DATABASE_URI": "mysql+pymysql://root:1234@localhost/horse",
            "SECRET_KEY": "adadsadkadsass",
            "DEBUG": True,
            "SQLALCHEMY_ECHO": True,
            "SQLALCHEMY_TRACK_MODIFICATIONS": False,
            "FLASK_JWT": "460",
            "SERVER_NAME": "localhost",
            "APPLICATION_ROOT": '/',
            "PREFERRED_URL_SCHEME": "http"
        })
        self.app_context = self.app.app_context()
        self.app_context.push()  # Activate the application context

        self.client = self.app.test_client()

        with self.app.test_request_context():
            self.test_token = create_access_token(identity={
                "email": "test@gmail.com",
                "id": "123-abc",
                "role": "ADMIN"
            })
        # self.app.testing = True
        # self.client = self.app.test_client()

    @patch('models.User.User.get_user_by_id')
    @patch('controllers.user_controller.check_api_key_valid')
    @patch('dao.User.UserSchema')
    @patch('models.Integration.Integration.save')
    def test_create_connection(self, mock_integration_save, mock_user_schema,
                               mock_check_api_key_valid, mock_get_user_by_id):
        # Mock User object
        user_mock = MagicMock()

        # Configure User mock to return user_mock instance
        mock_get_user_by_id.return_value = user_mock

        # Mock UserSchema dump method
        mock_user_schema.return_value.dump.return_value = {"id": 1}

        # Mock Integration.save method
        mock_integration_save.return_value = None

        response_mock = MagicMock()
        response_mock.status_code = 200
        response_mock.json.return_value = {"example_key": "example_value"}

        mock_integration = MagicMock()

        mock_check_api_key_valid.return_value = (mock_integration, response_mock)

        response = self.client.post('/integration/create-connection', json={"user_id": 1, "api_key": "your_api_key"})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), {"example_key": "example_value"})

        mock_get_user_by_id.assert_called_once_with(1)
        mock_check_api_key_valid.assert_called_once_with({"user_id": 1, "api_key": "your_api_key"}, user_mock)

        mock_integration_save.assert_called_once()

    def tearDown(self):
        self.app_context.pop()
