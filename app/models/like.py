from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'#we can change the name if we need to


    #ids
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    #relationships
    user = db.relationship("User", back_populates="likes")
    post = db.relationship("Post", back_populates="likes")

    #this will let any route do like.to.dict() and it should return a json friendly version of the like
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id
        }

#adding boolean to account for env
    if environment == "production":
        __table_args__ = (
            {'schema': SCHEMA},
            db.UniqueConstraint(
                'user_id',
                'post_id',
                name='unique_user_like'
            )
        )
    else:
        __table_args__ = (
            db.UniqueConstraint(
                'user_id',
                'post_id',
                name='unique_user_like'
            ),
        )
