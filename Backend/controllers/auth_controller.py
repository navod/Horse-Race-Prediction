from datetime import timedelta
from uuid import uuid4

from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt, get_jwt_identity

from dao.User import UserSchema
from enums.UserRoles import UserRole
from models.Integration import Integration
from models.TokenBlocklist import TokenBlocklist
from models.User import User

auth_bp = Blueprint('auth', __name__)


def generate_uuid():
    return uuid4()


@auth_bp.post('/register')
def register_user():
    data = request.get_json()
    user = User.get_user_by_email(email=data.get("email"))

    if user is not None:
        return jsonify({"error": "User already exists"}), 409

    new_user = User(
        first_name=data.get("first_name"),
        email=data.get("email"),
        id=generate_uuid(),
        last_name=data.get("last_name"),
        role=UserRole.CUSTOMER
    )
    new_user.set_password(password=data.get("password"))
    new_user.save()

    return jsonify({"message": "User created"}), 201


@auth_bp.post("/login")
def login_user():
    data = request.get_json()

    user = User.get_user_by_email(email=data.get("email"))

    if user and (user.check_password(password=data.get("password"))):
        result = UserSchema().dump(user, many=False)

        integration = Integration.get_api_key_by_user_id(user.id)
        additional_json = {"is_integrated": True if integration else False}

        access_token_expires = timedelta(hours=2)
        refresh_token_expires = timedelta(days=30)

        combined_json = {**result, **additional_json}
        access_token = create_access_token(identity={"email": user.email, "id": user.id, "role": result["role"]},
                                           expires_delta=access_token_expires)
        refresh_token = create_refresh_token(identity={"email": user.email, "id": user.id, "role": result["role"]},
                                             expires_delta=refresh_token_expires)

        return (
            jsonify(
                {
                    "message": "Logged In ",
                    "tokens": {"access": access_token, "refresh": refresh_token},
                    "user": combined_json
                }
            ),
            200,
        )

    return jsonify({"error": "Invalid email or password"}), 400


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

    print(token_type)

    return jsonify({"message": f"{token_type} token revoked successfully"}), 200
