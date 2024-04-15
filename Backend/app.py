import logging
import os

from flask import Flask, jsonify
from flask_cors import CORS

from configurations.extensions import db, jwt
from controllers.auth_controller import auth_bp
from controllers.integration_controller import integration_bp
from controllers.race_controller import race_bp
from controllers.user_controller import user_bp


def create_app(config=None):
    logs_directory = 'logs'
    if not os.path.exists(logs_directory):
        os.makedirs(logs_directory)
    log_file_path = os.path.join(logs_directory, 'logger.log')
    logging.basicConfig(filename=log_file_path, level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

    app = Flask(__name__)
    if config:
        app.config.update(config)
    else:
        app.config.from_prefixed_env()

    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(race_bp, url_prefix='/races')
    app.register_blueprint(integration_bp, url_prefix='/integration')
    CORS(app)

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_data):
        return jsonify({"message": "Token has expired", "error": "token_expired"}), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return (
            jsonify(
                {"message": "Signature verification failed", "error": "invalid_token"}
            ),
            401,
        )

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return (
            jsonify(
                {
                    "message": "Request doesnt contain valid token",
                    "error": "authorization_header",
                }
            ),
            401,
        )

    with app.app_context():
        db.create_all()
    return app


# if __name__ == "__main__":
#     create_app()
