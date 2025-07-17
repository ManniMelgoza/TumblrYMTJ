from flask import Blueprint, jsonify 
from flask_login import login_required, current_user, login_user # ensuring logged in users can comment, and ensuring curent_user can do things 
from app.models import User, Comment, Post
from app.forms import CreateCommentForm
from flask_login import login_required 

comment_routes = Blueprint('comments', __name__)

# -------------------------- GET ALL COMMENTS FOR A POST -----------------------------#

# full endpoint : 'api/comments/<int:postID>'
# no user auth to view all comments
@comment_routes.route('/<int:postId>', methods=["GET"]) # our endpoint is the postId number and the retrieval method is `GET`
def all_comments(postId): # we begin a function that will retrieve all comments attached to a post by its postId
    """
    View all comments on a post
    """
    # here we use the SQLAlchemy's filter_by to get all comments by the postId which should match a id in our post_id column in our comments table
    comments = Comment.query.filter_by(post_id=postId).all() 

    # Since Flask does not know how to turn Python objects into JSON on its own 
    # We use jsonify to convert the python into this universal readable object aka JSON response

    return jsonify({'comments': [comment.to_dict() for comment in comments]}) 
    # what this now does is it gives us a list (via to_dict) of comments under the key "comments": {{comment1}, {comment2}, {etc}}


# --------------------------- POST A COMMENT ---------------------------------------#

# full endpoint : 'api/comments/<int:postId>/create'
# user must be logged in and authenticated to create a comment on a post
@comment_routes.route('/<int:postId>/create', methods=['POST']) # creating a url with the method POST to post a comment
@login_required # we require an authenticated user to create a comment
def create_comment(postId): # defining our function name which requires a postId to be passed in as an argument
    """
    Create a comment on a particular post
    """
    form = CreateCommentForm()  # we create an instance of CreateCommentForm which represents the data and validation requirements for comment submission

    if form.validate_on_submit(): # if the form is properly submitted and all validations pass then
        new_comment = Comment(  # add it as "new_comment" via a Comment object, filling in the required fields
            comment_body=form.data["comment_body"], # include comment body 
            user_id=current_user.id, # associate the comment with the logged-in user
            post_id=postId          # associate comment with the correct post 
        )
        db.session.add(new_comment) # if the comment is valid then add it and commit it
        db.session.commit() # Commit this new comment to the SQLAlchemy database
        return jsonify(new_comment.to_dict()), 200 # stays within the conditional gives output of new comment with username attached to it 
    else:
        return {'errors': form.errors}, 400 # our errors object will output what we specified in our form fields
        # example: 
        # {
        #   'comment_body': ["You gotta write a comment to leave a comment!"]
        # }

# ---------------------------- EDIT A COMMENT ------------------------------------------# 

# full endpoint : 'api/comments/<int:postId>/edit/<int:commentId>'
# user must be logged in and authenticated
# @comment_routes.route('/<int:postId>/<int:commentId>', methods=["PUT"])
# @login_required # user must be logged in
# # current user must be owner of comment
# def edit_comment(postId, commentId): # we create a function which will allow us to edit an existing comment so we will need the postId and now the commentId because we need to know which comment is being edited on what post
# # login_user(user)
# # user must be owner of that comment to edit it
#     commentId = comment.id # commentId is associated with the primary key of the Comment table 

#     edited_comment = Comment.query.filter_by(commentId, post_id) # we filter by the id of the comment and the post

# # if current user does not own comment, return an error
#     if current_user.id != user.id: # user has to be tied to primary key of comment not user 
#         return {'message': 'You must be the author of this comment to edit it!'}

# # we create an instance of the CreateCommentForm as an option to edit it
#     form = CreateCommentForm(obj=edited_comment)

#     # whenever you are logged in that will authenticate the ownership of that post
#     form['csrf_token'].data = request.cookies['csrf_token']


#     if form.validate_on_submit():
#         edited_comment.comment_body=form.data["comment_body"]

#         db.session.add(edited_comment)
#         db.session.commit()
#         return edited_comment.to_dict(), 200
#     else:
#         return {'errors': form.errors}, 400 
    
# --------------------------- DELETE A COMMENT ---------------------------------------#






