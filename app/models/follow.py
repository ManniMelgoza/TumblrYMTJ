from .db import db, environment, SCHEMA, add_prefix_for_prod
from .timestampmixin import TimeStampMixin


class Follow(db.Model, TimeStampMixin):
    __tablename__ = "follows"

    # Added boolean to account for env
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    # PRIMARY KEY: Creates a unique identifier for a follow relationship
    id = db.Column(db.Integer, primary_key=True)

    # FOREIGN KEY: Stores the user that is performing the follow action
    follower_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    # FOREIGN KEY: Stores the user that is being followed
    following_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    # RELATIONSHIPS
    # change from user to follower so that both are not the same variable 
    follower = db.relationship(
        "User", foreign_keys=[follower_id], back_populates="following"
    )
  
    # same applied here in the case of following 
    following = db.relationship(
        "User", foreign_keys=[following_id], back_populates="followers"
    )

    def to_dict(self):
        """
        Converts the Follow relationship for the API response

        Returns a dictionary that contains the following:
            -  Basic data from the follow relationship (id, follower_id, following_id)
            -  Username info from both the follower and following users
            -  Handlers that return 'None' if the user has no followers or is following nobody

        This returns the dictionary representation of the follow relationsship.
        """
        return {
            "id": self.id,
            "follower_id": self.follower_id,
            "following_id": self.following_id,
            "follower_username": self.follower.username if self.follower else None,
            "following_username": self.following.username if self.following else None,
        }