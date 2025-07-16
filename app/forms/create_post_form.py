from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
#To have acccess to the all post imprt post data
from app.models import Post

# Validations to think about
    # Do we want to make sure that the same post is not being duplicated by other users
    # check if title is already taken for a post

def post_title_exists(form, field):
    post_title = field.data
    post = Post.query.filter(Post.post_title == post_title).first()

    if post:
        raise ValidationError("The post tile is already in use.")

class CreatePostForm(FlaskForm):
    post_title = StringField('Title', validators=[DataRequired(), post_title_exists])
    post_body = TextAreaField('Go ahead, put yout thoughts and inspirations', validators=[DataRequired()])
    post_img_url = TextAreaField('Image', validators=[DataRequired()])
