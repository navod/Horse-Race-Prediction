import unittest
import requests

import jwt
import datetime


def generate_token(user_id, secret_key, expiry_minutes=60):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=expiry_minutes)
    }
    token = jwt.encode(payload, secret_key, algorithm='HS256')
    return token


# Example usage:


class TestApi(unittest.TestCase):
    url = "http://127.0.0.1:5000/user/all"
    auth = ("navod6", "Navod@2000")

    base_url = "http://127.0.0.1:5000"
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxMTU1OTA2OSwianRpIjoiMWU2MjQ5NTEtZmI5My00MTQ3LWFmYzUtNTM2MWJmMDMzNmRiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJlbWFpbCI6Im5hdm9kNkBnbWFpbC5jb20iLCJpZCI6IjE0ZWUxZThkLTMzMzUtNGVlMy05Mzg3LTE4NmVkYjQ5MzI4YyJ9LCJuYmYiOjE3MTE1NTkwNjksImNzcmYiOiJlY2Q5NzMyMC1kZjkxLTRlYzktODFmYy1kYzMyMTYwNzdiZjUiLCJleHAiOjE3MTE1NjYyNjl9.66v0uxzm8NPxeWzhu3uBaybRrbz8COK1EksHF7izLQo"

    def test_1_get_all_users(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        resp = requests.get(self.url, headers=headers, json=self.auth)
        print(resp.json())
        self.assertEqual(resp.status_code, 200)
        print("Test 1 completed")
