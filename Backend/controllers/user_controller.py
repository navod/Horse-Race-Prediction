from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from sqlalchemy import text

from configurations.extensions import db
from configurations.permisssions import role_required
from controllers.auth_controller import generate_uuid
from dao.User import UserSchema
from models.Integration import Integration
from models.User import User

user_bp = Blueprint("users", __name__)


@user_bp.post('/create')
@jwt_required()
@role_required("ADMIN")
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
        role=data.get("role")
    )
    new_user.set_password(password=data.get("password"))
    new_user.save()

    return jsonify({"message": "User created"}), 201


@user_bp.get("/all")
@jwt_required()
@role_required("ADMIN")
def get_all_users():
    per_page = request.args.get('per_page', default=10, type=int)
    page = request.args.get('page', default=1, type=int)
    search_term = request.args.get('search', default='', type=str)

    offset = (page - 1) * per_page

    query = text(
        "SELECT u.id, u.email, u.first_name, u.last_name, u.role, "
        "CASE WHEN i.user_id IS NOT NULL THEN 'True' ELSE 'False' END AS integration_status "
        "FROM user u LEFT JOIN integration i ON u.id = i.user_id "
        "WHERE u.first_name LIKE :search_term OR u.last_name LIKE :search_term OR u.email LIKE :search_term "
        "LIMIT :per_page OFFSET :offset")

    result = db.session.execute(query, {
        'search_term': f'%{search_term}%',
        'per_page': per_page,
        'offset': offset
    })
    paginated_data = [row for row in result]

    count_query = text("SELECT COUNT(*) FROM user WHERE first_name LIKE :search_term or last_name LIKE :search_term or email LIKE :search_term")

    total_records = db.session.execute(count_query, {'search_term': f'%{search_term}%'}).scalar()

    total_pages = (total_records + per_page - 1) // per_page

    results = []
    for row in paginated_data:
        results.append({
            'id': row.id,
            'first_name': row.first_name,
            'email': row.email,
            'last_name': row.last_name,
            'role': row.role,
            'integration_status': row.integration_status
        })

    return (
        jsonify(
            {
                "users": results,
                "pagination": {
                    "total_pages": total_pages,
                    "total_records": total_records
                }
            }
        ),
        200,
    )


@user_bp.get("/")
@jwt_required()
@role_required("ADMIN")
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


@user_bp.put("/update")
@jwt_required()
@role_required("ADMIN")
def update_user():
    try:
        user = User.get_user_by_id(request.args.get('id'))

        user.first_name = request.json["first_name"]
        user.last_name = request.json["last_name"]
        user.role = request.json["role"]

        user.update()

        result = UserSchema().dump(user, many=False)

        integration = Integration.get_api_key_by_user_id(request.args.get('id'))
        additional_json = {"is_integrated": True if integration else False}

        combined_json = {**result, **additional_json}
        return jsonify({"data": combined_json, "message": "user updated"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@user_bp.delete("/delete")
@jwt_required()
@role_required("ADMIN")
def delete_user():
    try:
        user = User.get_user_by_id(request.args.get('id'))

        integration = Integration.get_api_key_by_user_id(request.args.get('id'))

        if integration is not None:
            integration.delete()

        if user is not None:
            user.delete()

            return jsonify({"message": "user deleted"}), 200
        else:
            return jsonify({"message": "user not available"}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


