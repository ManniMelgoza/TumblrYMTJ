from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follow(db.Model):
    __tablename__ = 'follows'

    # Added boolean to account for env
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # PRIMARY KEY: Creates a unique identifier for a follow relationship
    id = db.Column(db.Integer, primary_key=True)

    # FOREIGN KEY: Stores the user that is performing the follow action
    follower_id = db.Column(
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("users.id")), 
        nullable=False
    )
        
    # FOREIGN KEY: Stores the user that is being followed
    following_id = db.Column(
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("users.id")), 
        nullable=False
    )

    #RELATIONSHIPS
    follower = db.relationship(
        "User",
        foreign_keys=[follower_id],
        backref="following_relationships"
    )
    
    following = db.relationship(
        "User", 
        foreign_keys=[following_id],
        backref="follower_relationships"
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
            'id': self.id,
            'follower_id': self.follower_id,
            'following_id': self.following_id,
            'follower': self.follower.username if self.follower else None, 
            'following': self.following.username if self.following else None
        }