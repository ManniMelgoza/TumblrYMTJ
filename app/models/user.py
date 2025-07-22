from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
# where is this user class coming in and worry about user class
from flask_login import UserMixin
from .follow import Follow


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    likes = db.relationship("Like", back_populates="user", cascade="all, delete-orphan")
    following = db.relationship("Follow", foreign_keys=[Follow.follower_id], back_populates="user", cascade="all, delete-orphan")
    followers = db.relationship("Follow", foreign_keys=[Follow.following_id], back_populates="user", cascade="all, delete-orphan")
    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'followers_count': len(self.followers),  # Gets a count of all the followers
            'following_count': len(self.following)  # Gets a count of all the users the current user is following
        }
