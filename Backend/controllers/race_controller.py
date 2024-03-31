from flask import Blueprint, jsonify, request
import requests as req
from flask_jwt_extended import jwt_required

from dao.Integration import IntegrationSchema
from models.Integration import Integration
from utility.test_data import get_test_races, get_test_race
from utility.utility import get_current_user
import joblib
import pandas as pd

race_bp = Blueprint("races", __name__)
Dmodel = joblib.load("machine_learning_modal/my_trained_lightgbm_model.pkl")


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


@race_bp.get("/prediction")
# @jwt_required()
def predict_race():
    try:
        dt = {
            'age': [],
            'last_ran_days_ago': [],
            'non_runner': [],
            'official_rating': [],
            'starting_price': []
        }
        dt['age'] = [5]
        dt['last_ran_days_ago'] = [30]
        dt['non_runner'] = [0]
        dt['official_rating'] = [90]
        dt['starting_price'] = [1.8]

        dt = pd.DataFrame(dt)
        dn = Dmodel.predict(dt)

        print(dn)

        # user = get_current_user()
        # integration = Integration.get_api_key_by_user_id(user['id'])
        # integration_schema = IntegrationSchema().dump(integration, many=False)
        # race_id = request.args.get('id')
        # # url = f'https://horse-racing.p.rapidapi.com/race/{race_id}'
        # # headers = {
        # #     'X-RapidAPI-Key': integration_schema['api_key'],
        # #     'X-RapidAPI-Host': 'horse-racing.p.rapidapi.com'
        # # }
        # # # params = {'date': request.args.get('date')}
        # # response = req.get(url, headers=headers)
        # # data = response.json()
        # test_data = get_test_race()
        # test = {}
        #
        return jsonify({"message": "hello"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
