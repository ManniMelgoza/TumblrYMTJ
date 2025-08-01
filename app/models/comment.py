from .db import db, environment, SCHEMA, add_prefix_for_prod
from .timestampmixin import TimeStampMixin

class Comment(db.Model, TimeStampMixin):
    __tablename__ = 'comments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, 
        db.ForeignKey(add_prefix_for_prod("users.id")), 
        nullable=False
        )
    post_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("posts.id")),
        nullable=False
        )
    comment_body = db.Column(db.String(300), nullable=False)

# Relationships
    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'comment_body': self.comment_body,
            'username': self.user.username if self.user else None, # extracting just the username from our Users table to attach to the response body 
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }