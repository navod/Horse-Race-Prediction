from flask import Flask, jsonify

from controllers.auth_controller import auth_bp
from configurations.extensions import db, jwt
from controllers.integration_controller import integration_bp
from controllers.user_controller import user_bp
from controllers.race_controller import race_bp
from flask_cors import CORS

def create_app(config=None):
    app = Flask(__name__)
   
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