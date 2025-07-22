from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follow(db.Model):
    __tablename__ = 'follows'

    # Added boolean to account for env
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # IDs
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    following_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    # Relationships
    follower = db.relationship("User", foreign_keys=[follower_id], back_populates="following") # USED TO SAY FOLLOWING
    following = db.relationship("User", foreign_keys=[following_id], back_populates="followers") # USED TO SAY FOLLOWERS

    def to_dict(self):
        return {
            'id': self.id,
            'follower_id': self.follower_id,
            'following_id': self.following_id,
            'follower': self.follower.username if self.follower else None, # Returns 'None' if the user has no followers
            'following': self.following.username if self.following else None # Returns 'None' if the user is following nobody
        }