from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'#we can change the name if we need to

    #adding boolean to account for env
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    #ids
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    #relationships
    # TODO COMMENT THIS LINE BACK UP LATER
    # user = db.relationship("User", back_populates="likes")
    # post = db.relationship("Post", back_populates="likes")
