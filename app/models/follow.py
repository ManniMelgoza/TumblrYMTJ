from .db import db, environment, SCHEMA, add_prefix_for_prod

class Follow(db.Model):
    __tablename__ = 'follows'

    # Added boolean to account for env
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # IDs
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    # Relationships
    follower = db.relationship("User", foreign_keys=[follower_id], back_populates="following")
    followed = db.relationship("User", foreign_keys=[followed_id], back_populates="followers")