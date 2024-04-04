# from unittest.mock import patch
#
# from controllers.auth_controller import generate_uuid
# from models.User import User
#
#
# def test_register_user(client):
#     # Define test data
#     user_id = generate_uuid()
#     test_data = {
#         "first_name": "John",
#         "last_name": "Doe",
#         "email": "john.doe@example.com",
#         "password": "password123",
#         "role": "CUSTOMER",
#         "id": user_id
#     }
#
#     # Make a POST request to the register endpoint
#     with patch.object(User, "get_user_by_email", return_value=None):  # Mocking User.get_user_by_email to return None
#         with patch.object(User, "save") as mock_save:  # Mocking User.save method
#             # Make a POST request to the register endpoint
#             response = client.post("/auth/register", json=test_data)
#
#             # Check if the response status code is 201 (Created)
#             assert response.status_code == 201
#
#             # Check if the response contains the expected message
#             assert b"User created" in response.data
#
#             # Check if User.save method is called with correct arguments
#             mock_save.assert_called_once_with()
#
#
# def test_register_existing_user(client):
#     # Create a user with the same email as the one we're going to register
#
#     # Define test data with the same email
#     test_data = {
#         "first_name": "John",
#         "last_name": "Doe",
#         "email": "jane.doe@example.com",  # Existing email
#         "password": "password123",
#         "id": generate_uuid()
#     }
#
#
#     with patch.object(User, "get_user_by_email",
#                       return_value="jane.doe@example.com"):  # Mocking User.get_user_by_email to return None
#         with patch.object(User, "save") as mock_save:  # Mocking User.save method
#             response = client.post("/auth/register", json=test_data)
#
#             assert response.status_code == 409