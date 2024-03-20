from flask import Blueprint, jsonify, request
import requests as req
from flask_jwt_extended import jwt_required

from dao.Integration import IntegrationSchema
from models.Integration import Integration
from utility.test_data import get_test_races, get_test_race
from utility.utility import get_current_user

race_bp = Blueprint("races", __name__)


@race_bp.get("/all")
@jwt_required()
def get_all_race_cards():
    try:
        user = get_current_user()
        integration = Integration.get_api_key_by_user_id(user['id'])
        integration_schema = IntegrationSchema().dump(integration, many=False)

        # url = 'https://horse-racing.p.rapidapi.com/racecards'
        # headers = {
        #     'X-RapidAPI-Key': integration_schema['api_key'],
        #     'X-RapidAPI-Host': 'horse-racing.p.rapidapi.com'
        # }
        # params = {'date': request.args.get('date')}
        # response = req.get(url, headers=headers, params=params)
        # data = response.json()

        test_data = get_test_races()
        test = []

        return jsonify(test_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@race_bp.get("/race")
@jwt_required()
def get_race_detail():
    try:
        user = get_current_user()
        integration = Integration.get_api_key_by_user_id(user['id'])
        integration_schema = IntegrationSchema().dump(integration, many=False)
        race_id = request.args.get('id')
        # url = f'https://horse-racing.p.rapidapi.com/race/{race_id}'
        # headers = {
        #     'X-RapidAPI-Key': integration_schema['api_key'],
        #     'X-RapidAPI-Host': 'horse-racing.p.rapidapi.com'
        # }
        # # params = {'date': request.args.get('date')}
        # response = req.get(url, headers=headers)
        # data = response.json()
        test_data = get_test_race()
        test = {}

        return jsonify(test_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
