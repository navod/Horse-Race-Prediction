from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt

from dao.User import UserSchema
from models.Integration import Integration
from models.User import User

user_bp = Blueprint("users", __name__)


@user_bp.get("/all")
@jwt_required()
def get_all_users():
    claims = get_jwt()
    page = request.args.get("page", default=1, type=int)

    per_page = request.args.get("per_page", default=10, type=int)

    users = User.query.paginate(page=page, per_page=per_page)
    total_pages = users.pages
    total_records = users.total
    result = UserSchema().dump(users, many=True)

    return (
        jsonify(
            {
                "users": result,
                "pagination": {
                    "total_pages": total_pages,
                    "total_records": total_records
                }
            }
        ),
        200,
    )


@user_bp.get("/")
# @jwt_required()
def get_user_detail():
    try:
        user = User.get_user_by_id(request.args.get('id'))
        result = UserSchema().dump(user, many=False)

        integration = Integration.get_api_key_by_user_id(request.args.get('id'))
        additional_json = {"is_integrated": True if integration else False}

        combined_json = {**result, **additional_json}
        return jsonify(combined_json), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
