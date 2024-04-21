import pickle

import numpy as np
import pandas as pd
import requests
import requests as req
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from configurations.logger import logger
from configurations.permisssions import role_required
from dao.Integration import IntegrationSchema
from models.Integration import Integration
from utility.test_data import get_test_race, get_test_races
from utility.utility import get_current_user

race_bp = Blueprint("races", __name__)
loaded_model = None
modal_url = 'https://github.com/navod/horse-race-modal/raw/main/my_trained_lightgbm_model.pkl'
response = requests.get(modal_url)
if response.status_code == 200:
    loaded_model = pickle.loads(response.content)


@race_bp.get("/all")
@jwt_required()
@role_required("CUSTOMER")
def get_all_race_cards():
    try:
        logger.info("get all race card function called")
        user = get_current_user()
        integration = Integration.get_api_key_by_user_id(user['id'])
        integration_schema = IntegrationSchema().dump(integration, many=False)

        url = 'https://horse-racing.p.rapidapi.com/racecards'
        headers = {
            'X-RapidAPI-Key': integration_schema['api_key'],
            'X-RapidAPI-Host': 'horse-racing.p.rapidapi.com'
        }
        params = {'date': request.args.get('date')}
        response = req.get(url, headers=headers, params=params)
        data = response.json()

        # test_data = get_test_races()

        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@race_bp.get("/race")
@jwt_required()
@role_required("CUSTOMER")
def get_race_detail():
    try:
        logger.info("get race detail function called")
        user = get_current_user()
        integration = Integration.get_api_key_by_user_id(user['id'])
        integration_schema = IntegrationSchema().dump(integration, many=False)
        race_id = request.args.get('id')
        url = f'https://horse-racing.p.rapidapi.com/race/{race_id}'
        headers = {
            'X-RapidAPI-Key': integration_schema['api_key'],
            'X-RapidAPI-Host': 'horse-racing.p.rapidapi.com'
        }
        params = {'date': request.args.get('date')}
        response = req.get(url, headers=headers, params=params)
        data = response.json()

        # test_data = get_test_race()

        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def check_numeric(value):
    if value is not None:
        if not value.isdigit():
            return 0
        else:
            return int(value)
    else:
        return 0


def check_empty(value):
    if value == "" or value is None:
        return 0
    else:
        return float(value)


@race_bp.post("/prediction")
@jwt_required()
def predict_race():
    try:
        logger.info("get prediction race detail function called")

        data = request.get_json()
        horses = data.get("horses")

        ages, forms_1, forms_2, forms_3, forms_4, forms_5, last_ran_days_ago, official_ratings, starting_prices = get_horses_data(
            horses)

        horse_data = {
            'age': ages,
            'last_ran_days_ago': last_ran_days_ago,
            'gens': starting_prices,
            'official_rating': official_ratings,
            'starting_price': starting_prices,
            'form_1': forms_1,
            'form_2': forms_2,
            'form_3': forms_3,
            'form_4': forms_4,
            'form_5': forms_5
        }

        horse_places = predict_modal(horse_data)
        print(horse_places)
        new_horses = []

        for index, horse in enumerate(horses):
            new_horse = dict(horse)  # Create a copy of the horse dictionary
            new_horse["place"] = [place for place in horse_places if index + 1 == place['horse_id']][0]['place']
            new_horses.append(new_horse)

        sorted_new_horses = sorted(new_horses, key=lambda x: x['place'])
        return jsonify({'data': sorted_new_horses}), 200
    except Exception as e:
        logger.error(e)
        print(e)
        return jsonify({'error': str(e)}), 500


def get_horses_data(horses):
    ages = []
    last_ran_days_ago = []
    non_runners = []
    official_ratings = []
    starting_prices = []
    forms_1 = []
    forms_2 = []
    forms_3 = []
    forms_4 = []
    forms_5 = []
    for horse in horses:
        for key, value in horse.items():
            if key == "age":
                ages.append(check_empty(value))

            if key == "non_runner":
                non_runners.append(check_empty(value))

            if key == "OR":
                official_ratings.append(check_empty(value))

            if key == "last_ran_days_ago":
                last_ran_days_ago.append(check_empty(value))

            if key == "sp":
                starting_prices.append(check_empty(value))

            if key == "form":
                if len(value) > 0:
                    forms_1.append(check_numeric(value[0]))
                else:
                    forms_1.append(0)

                if len(value) > 1:
                    forms_2.append(check_numeric(value[1]))
                else:
                    forms_2.append(0)

                if len(value) > 2:
                    forms_3.append(check_numeric(value[2]))
                else:
                    forms_3.append(0)

                if len(value) > 3:
                    forms_4.append(check_numeric(value[3]))
                else:
                    forms_4.append(0)

                if len(value) > 4:
                    forms_5.append(check_numeric(value[4]))
                else:
                    forms_5.append(0)
    return ages, forms_1, forms_2, forms_3, forms_4, forms_5, last_ran_days_ago, official_ratings, starting_prices


def predict_modal(horse_data):
    horse_df = pd.DataFrame(horse_data)
    predictions = loaded_model.predict(horse_df)

    assigned_places = {}

    for i, prob_dist in enumerate(predictions):
        # Find the index of the place with the highest probability
        place = np.argmax(prob_dist) + 1
        # Get the horse name (assuming horse names are in the index)
        horse_name = horse_df.index[i]

        # Check if this place is already assigned
        while place in assigned_places.values():
            # If assigned, increment the place for this horse
            place += 1

        # Assign the place to the horse and store it in the dictionary
        assigned_places[horse_name] = place

    # Create a list of dictionaries with horse name and place
    horses_with_predicted_place = [{'horse_name': name, 'place': place} for name, place in assigned_places.items()]

    horses_with_predicted_place.sort(key=lambda x: x['place'])

    horse_predictions = []
    for horse_place in horses_with_predicted_place:
        print(f"Horse: {horse_place['horse_name'] + 1}, Predicted Place: {horse_place['place']}")
        horse_predictions.append({"horse_id": horse_place['horse_name'] + 1, "place": int(horse_place['place'])})

    return horse_predictions
