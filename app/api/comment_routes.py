from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user, login_user # ensuring logged in users can comment, and ensuring curent_user can do things 
from app.models import User, Comment, Post, db
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

# full endpoint : 'api/comments/<int:postId>/comment'
# user must be logged in and authenticated to create a comment on a post
@comment_routes.route('/<int:postId>/comment', methods=['POST']) # creating a url with the method POST to post a comment
@login_required # we require an authenticated user to create a comment
def create_comment(postId): # defining our function name which requires a postId to be passed in as an argument
    """
    Create a comment on a particular post
    """
    form = CreateCommentForm()  # we create an instance of CreateCommentForm which represents the data and validation requirements for comment submission

    # include csrf protection
    form['csrf_token'].data = request.cookies['csrf_token']

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
@comment_routes.route('/<int:postId>/edit/<int:commentId>', methods=["PUT"])
@login_required # user must be logged in
def edit_comment(postId, commentId): # we create a function which will allow us to edit an existing comment so we will need the postId and now the commentId because we need to know which comment is being edited on what post
# login_user(user)
# user must be owner of that comment to edit it

    comment = Comment.query.get(commentId) # we fetch the comment by its commentId (aka primary key(id))

    # I like to think of this as a game of Mah-Jong where we compare tiles: 

    # Does a tile (comment) with number 3 exist in the Comment table?

    # If not then it's a ghost tile. Return 404.

    # If it does exist, does it belong to the post with tile number 8?

    # If not, then it is a mismatch. Return 404.

    # If both tiles match up perfectly (comment 3 belongs to post 8)?

    # You’re allowed to make a move — i.e. editing the comment.

    # So if our comment does not exist in the database or...
    # if the postId extracted from our API endpoint does not match a number under our post_id column in our Comment table
    # then throw an error
    if not comment or comment.post_id != postId:
        return { 'message': 'Comment not found on this post'}, 404 # in case a comment is deleted and is removed from database

    # Same Mah-Jong tile matching logic here: 

# if current user does not equal the user id in comment table, return an error
    if current_user.id != comment.user_id: # current user must be matching with the foreign key id associated with that comment 
# The current_user.id must match the user_id foreign key on the comment — meaning the user currently logged in must be the same user who originally wrote the comment.
        return {'message': 'You must be the author of this comment to edit it!'}

# FORM VALIDATION
# we create an instance of the CreateCommentForm as an option to edit it
    form = CreateCommentForm(obj=comment) # pre-fills your form with the existing data when editing 

    # include csrf protection
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        comment.comment_body=form.data["comment_body"]
        # no need for db.session.add(comment) because we are not creating a new record simply modifying an existing one
        db.session.commit()
        return comment.to_dict(), 200
    else:
        return {'errors': form.errors}, 400 
    
# --------------------------- DELETE A COMMENT ---------------------------------------#

# now we have to delete a comment so we establish our route
# same as edit route essentially because we need a postid and commentid
# full API route with Blueprints is /api/comments/postId/delete/commentId
@comment_routes.route('/<int:postId>/delete/<int:commentId>')
@login_required # user must be logged in to perform this CRUD operation
def delete_comment(postId, commentId): # pass in our integers from our endpoint into our delete_comment function to ensure a valid deletion

    comment = Comment.query.get(commentId) # again, we fetch that integer from our endpoint from our table

    # if that id number does not exist in our database or if the commentId is not associated with that postId then throw an error
    if not comment or comment.post_id != postId:
        return { 'message': 'Comment not found on this post'}, 404

    # if that comment does not belong to the current user then do not allow action 
    if comment.user_id != current_user.id: 
        return { 'message': 'You are not authorized to delete this comment.'}
    
    db.session.delete(comment) # this is like our .destroy in Express with Javascript
    db.session.commit() # commit this action 

    return { 'message': 'Comment successfully deleted'}, 200 # return a 200 status code with a success reponse




