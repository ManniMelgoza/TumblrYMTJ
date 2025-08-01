from .db import db, environment, SCHEMA, add_prefix_for_prod
from .timestampmixin import TimeStampMixin

# For all tables created they will inherit the TimeStampMixin
class Post(db.Model, TimeStampMixin):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_title = db.Column(db.String(255), nullable=False)
    post_body = db.Column(db.Text, nullable=False)
    post_img_url = db.Column(db.String(255), nullable=True)

# Relationships
    user = db.relationship("User", back_populates='post')
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    likes = db.relationship("Like", back_populates="post", cascade="all, delete-orphan")

    # NOTE FOR POST: IF WE ADD cascade delete of any type here if we remove post whatever user is linked to that post will also be deleted
    # NOTE FOR POST: THINK of logic for cascase delete before adding it to all sided of the relationships



    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'post_title': self.post_title,
            'post_body': self.post_body,
            "post_img_url": self.post_img_url
        }
