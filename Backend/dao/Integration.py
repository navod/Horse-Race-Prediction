from marshmallow import Schema, fields


class IntegrationSchema(Schema):
    id = fields.Integer()
    user_id = fields.String()
    api_key = fields.String()
    created_at = fields.DateTime()