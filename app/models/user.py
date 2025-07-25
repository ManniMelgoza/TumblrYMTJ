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
    
    # Relationships
    likes = db.relationship("Like", back_populates="user", cascade="all, delete-orphan")
    following = db.relationship("Follow", foreign_keys=[Follow.follower_id], back_populates="follower", cascade="all, delete-orphan")
    followers = db.relationship("Follow", foreign_keys=[Follow.following_id], back_populates="following", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    post = db.relationship("Post", back_populates="user", cascade="all")
    
    # JOINING in the value of posts a column name magically being made in the user table to be able to access data but not visible in schema
    # Column varibale = db.relationship("WHAT TABLE WE WANT THE DATA TO COME FROM", back_populates="must match in the user or model you want to look at for data")
    # delete-orphan: if

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
