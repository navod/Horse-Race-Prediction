from datetime import datetime

from configurations.extensions import db


class TokenBlocklist(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    jti = db.Column(db.String(120), nullable=True)
    create_at = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"<Token {self.jti}>"

    def save(self):
        db.session.add(self)
        db.session.commit()