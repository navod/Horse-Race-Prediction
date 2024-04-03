from werkzeug.security import generate_password_hash, check_password_hash

from configurations.extensions import db
from enums.UserRoles import UserRole


class User(db.Model):
    __table_name = 'users'
    id = db.Column(db.String(120), primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80))
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.Text())
    role = db.Column(db.Enum(UserRole), nullable=False)

    def __repr__(self):
        return f"<User {self.email}>"

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @classmethod
    def get_user_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def get_user_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()
