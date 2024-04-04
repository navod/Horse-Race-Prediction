import json
import unittest
from unittest.mock import patch, MagicMock
from flask_jwt_extended import create_access_token
from app import create_app


class TestUser(unittest.TestCase):
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

    @patch('controllers.user_controller.generate_uuid')
    @patch('models.User.User.get_user_by_email')
    @patch('models.User.User.save')
    def test_create_user(self, mock_save, mock_get_user_by_email, mock_generate_uuid):
        mock_generate_uuid.return_value = 'mocked_uuid'
        mock_get_user_by_email.return_value = None

        data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "password": "password123",
            "role": "ADMIN"
        }
        response = self.client.post('/user/create', data=json.dumps(data),
                                    content_type='application/json',
                                    headers={'Authorization': f'Bearer {self.test_token}'})

        self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.data), {"message": "User created"})
        mock_save.assert_called()

    @patch('models.User.User.get_user_by_id')
    @patch('models.Integration.Integration.get_api_key_by_user_id')
    def test_get_user_detail(self, mock_get_api_key_by_user_id, mock_get_user_by_id):
        user_mock = MagicMock()
        user_mock.id = "1"
        user_mock.first_name = 'John'
        user_mock.last_name = 'Doe'
        user_mock.email = 'john@example.com'
        user_mock.role = 'ADMIN'

        mock_get_user_by_id.return_value = user_mock
        mock_get_api_key_by_user_id.return_value = 'mocked_api_key'

        response = self.client.get('/user/?id=1rtf', headers={'Authorization': f'Bearer {self.test_token}'})

        self.assertEqual(response.status_code, 200)

        expected_response = MagicMock()

        expected_response.id = "1"
        expected_response.first_name = 'John'
        expected_response.last_name = 'Doe'
        expected_response.email = 'john@example.com'
        expected_response.role = 'ADMIN'

        # expected_response = {
        #     "id": 1,
        #     "first_name": "John",
        #     "last_name": "Doe",
        #     "email": "john@example.com",
        #     "role": "ADMIN",
        #     "is_integrated": True
        # }

    patch('your_module.User.get_user_by_id')

    @patch('models.User.User.get_user_by_id')
    @patch('dao.User.UserSchema')
    @patch('models.Integration.Integration.get_api_key_by_user_id')
    def test_update_user(self, mock_get_api_key_by_user_id, mock_UserSchema, mock_get_user_by_id):
        # Create a MagicMock instance to represent a User object
        user_mock = MagicMock()
        user_mock.id = 1
        user_mock.first_name = 'John'
        user_mock.last_name = 'Doe'
        user_mock.role = 'ADMIN'

        # Configure the mock to return the user_mock instance
        mock_get_user_by_id.return_value = user_mock

        # Mock UserSchema dump method
        mock_UserSchema.return_value.dump.return_value = {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "role": "ADMIN"
        }

        # Configure Integration mock
        mock_get_api_key_by_user_id.return_value = 'mocked_api_key'

        response = self.client.put('/user/update?id=1', json={
            "first_name": "John",
            "last_name": "Doe",
            "role": "ADMIN"
        }, headers={'Authorization': f'Bearer {self.test_token}'})

        self.assertEqual(response.status_code, 200)
        expected_response = {
            "data": {
                "id": 1,
                "first_name": "John",
                "last_name": "Doe",
                "role": "ADMIN",
                "is_integrated": True
            },
            "message": "user updated"
        }

    @patch('models.User.User.get_user_by_id')
    @patch('models.Integration.Integration.get_api_key_by_user_id')
    def test_delete_user(self, mock_get_api_key_by_user_id, mock_get_user_by_id):
        # Mock User object
        user_mock = MagicMock()

        # Configure User mock to return user_mock instance
        mock_get_user_by_id.return_value = user_mock

        # Mock Integration object
        integration_mock = MagicMock()

        # Configure Integration mock to return integration_mock instance
        mock_get_api_key_by_user_id.return_value = integration_mock

        response = self.client.delete('/user/delete?id=1', headers={'Authorization': f'Bearer {self.test_token}'})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), {"message": "user deleted"})

        # Ensure delete method is called on user_mock
        user_mock.delete.assert_called_once()

        # Ensure delete method is called on integration_mock
        integration_mock.delete.assert_called_once()

    def tearDown(self):
        self.app_context.pop()
