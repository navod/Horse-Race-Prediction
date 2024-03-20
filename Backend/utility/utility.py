from flask import jsonify
from flask_jwt_extended import get_jwt


def get_current_user():
    return get_jwt().get("sub")
