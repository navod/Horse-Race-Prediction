from marshmallow import fields, Schema, validate

from enums.UserRoles import UserRole


class UserSchema(Schema):
    id = fields.String()
    email = fields.String()
    first_name = fields.String()
    last_name = fields.String()
    role = fields.Enum(UserRole, validate=validate.OneOf([role.value for role in UserRole]))
