from datetime import datetime

from configurations.extensions import db


class Integration(db.Model):
    __table_name = 'integration'
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(45), db.ForeignKey('user.id'))
    api_key = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    def save(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_api_key_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).first()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
