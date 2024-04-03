from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import get_jwt

ROLES = {
    'ADMIN': ['ADMIN'],
    'CUSTOMER': ['CUSTOMER','ADMIN']
}


def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Assume you have some way to retrieve the user role
            # Here, we're using a dummy function `get_user_role()`
            user_role = get_user_role()

            # Check if the user has the required role
            if user_role in ROLES.get(role, []):
                return f(*args, **kwargs)
            else:
                return jsonify({'message': 'Unauthorized'}), 403

        return decorated_function

    return decorator


def get_user_role():
    jwt = get_jwt()
    return jwt['sub']['role']
