# tests/__init__.py

from flask_jwt_extended import create_access_token
from app import create_app


def set_up():
    app = create_app({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        "SECRET_KEY": "adadsadkadsass",
        "DEBUG": True,
        "SQLALCHEMY_ECHO": True,
        "SQLALCHEMY_TRACK_MODIFICATIONS": False,
        "FLASK_JWT": "460",
        "SERVER_NAME": "localhost",
        "APPLICATION_ROOT": '/',
        "PREFERRED_URL_SCHEME": "http"
    })
    app_context = app.app_context()
    app_context.push()  # Activate the application context

    client = app.test_client()

    with app.test_request_context():
        test_token = create_access_token(identity={
            "email": "test@gmail.com",
            "id": "123-abc",
            "role": "ADMIN"
        })

    return app, client, test_token


def tearDown(self):
    self.app_context.pop()
