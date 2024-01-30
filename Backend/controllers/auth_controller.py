from uuid import uuid4

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt, get_jwt_identity

from models.TokenBlocklist import TokenBlocklist
from models.User import User

auth_bp = Blueprint('auth', __name__)


def generate_uuid():
    return uuid4()


@auth_bp.post('/register')
def register_user():
    data = request.get_json()
    user = User.get_user_by_username(username=data.get("username"))

    if user is not None:
        return jsonify({"error": "User already exists"}), 409

    new_user = User(username=data.get("username"), email=data.get("email"), id=generate_uuid())
    new_user.set_password(password=data.get("password"))
    new_user.save()

    return jsonify({"message": "User created"}), 201


@auth_bp.post("/login")
def login_user():
    data = request.get_json()

    user = User.get_user_by_username(username=data.get("username"))

    if user and (user.check_password(password=data.get("password"))):
        access_token = create_access_token(identity={"username": user.username, "id": user.id})
        refresh_token = create_refresh_token(identity={"username": user.username, "id": user.id})

        return (
            jsonify(
                {
                    "message": "Logged In ",
                    "tokens": {"access": access_token, "refresh": refresh_token},
                }
            ),
            200,
        )

    return jsonify({"error": "Invalid username or password"}), 400


@auth_bp.get("/refresh")
@jwt_required(refresh=True)
def refresh_access():
    identity = get_jwt_identity()

    new_access_token = create_access_token(identity=identity)

    return jsonify({"access_token": new_access_token})


@auth_bp.get('/logout')
@jwt_required(verify_type=False)
def logout_user():
    jwt = get_jwt()

    jti = jwt['jti']
    token_type = jwt['type']

    token_b = TokenBlocklist(jti=jti)

    token_b.save()

    return jsonify({"message": f"{token_type} token revoked successfully"}), 200
