from datetime import datetime

import requests as req
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from configurations.permisssions import role_required
from dao.User import UserSchema
from models.Integration import Integration
from models.User import User

integration_bp = Blueprint("integration", __name__)


@integration_bp.post("/create-connection")
@jwt_required()
@role_required("CUSTOMER")
def create_connection():
    try:
        data = request.get_json()
        user = User.get_user_by_id(data.get("user_id"))
        if user is not None:
            integration, response = check_api_key_valid(data, user)

            if response.status_code == 200:
                integration.save()

            data = response.json()
            return jsonify(data), response.status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def check_api_key_valid(data, user):
    url = 'https://horse-racing.p.rapidapi.com/racecards'
    headers = {
        'X-RapidAPI-Key': data.get("api_key"),
        'X-RapidAPI-Host': 'horse-racing.p.rapidapi.com'
    }
    params = {'date': datetime.now().strftime('%Y-%m-%d')}
    result = UserSchema().dump(user, many=False)
    integration = Integration(
        api_key=data.get("api_key"),
        user_id=result["id"]
    )
    response = req.get(url, headers=headers, params=params)
    return integration, response


@integration_bp.delete("/delete-connection")
@jwt_required()
@role_required("CUSTOMER")
def delete_connection():
    try:
        user_id = request.args.get('user_id')
        integration = Integration.get_api_key_by_user_id(user_id)
        Integration.delete(integration)
        return jsonify({"message": "Integration deleted successfully"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
