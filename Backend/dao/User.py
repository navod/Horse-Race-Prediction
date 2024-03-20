from marshmallow import fields, Schema


class UserSchema(Schema):
    id = fields.String()
    email = fields.String()
    first_name = fields.String()
    last_name = fields.String()