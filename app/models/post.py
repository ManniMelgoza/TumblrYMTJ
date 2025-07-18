from .db import db, environment, SCHEMA, add_prefix_for_prod
from .timestampmixin import TimeStampMixin

# For all tables created they will inherit the TimeStampMixin 
class Post(db.Model, TimeStampMixin):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer)
    post_title = db.Column(db.String(255), nullable=False)
    post_body = db.Column(db.Text, nullable=False)
    post_img_url = db.Column(db.String(255), nullable=True)

# Relationships
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'),
    #                     # ondelete='CASCADE',
    #                     nullable=False,
    #                     index=True,
    #                     unique=True)
    # user = db.relationship("User", back_populates='post')

    def to_dict(self):
        return {
            'id': self.id,
            'post_title': self.post_title,
            'post_body': self.post_body,
            "post_img_url": self.post_img_url
        }
