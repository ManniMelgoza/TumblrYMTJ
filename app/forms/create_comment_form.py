from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment

# we create a class for our comments section inheriting FlaskForm
class CreateCommentForm(FlaskForm): 
    comment_body = TextAreaField('Write a comment for this post', validators=[DataRequired(message="You gotta write a comment to leave a comment!")])
    # our comment_body column will accept a text aread field with a title prompting the user to write a comment 
