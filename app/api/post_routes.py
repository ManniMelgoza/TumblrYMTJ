from flask import Blueprint, request  # removed jsonify - Yaseen 
from app.models import Post, Comment, User, db # added Comment and User - Yaseen 
from app.forms import CreatePostForm, CreateCommentForm # added comment form - Yaseen
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)
comment_routes = Blueprint('comments', __name__) # added comment_routes blueprints - Yaseen

# *********************************
#       GET All Posts Route
#**********************************
@post_routes.route("/", methods=['GET'])
def all_posts():
    posts = Post.query.all()
    return {'Posts': [post.to_dict() for post in posts]}

# ADDING ANOTHER GET ROUTE TO FETCH ALL POSTS OF A USER 
# *********************************
#       GET Current User's Posts Route
# **********************************
@post_routes.route("/current", methods=['GET'])
@login_required  # Ensures the user must be logged in to access their own posts
def current_user_posts():
    # Fetch posts that belong to the logged-in user
    posts = Post.query.filter_by(owner_id=current_user.id).all()
    
    # Return the posts in the expected response format
    return {'Posts': [post.to_dict() for post in posts]}

# *********************************
#   POST Create a New Post Route
#**********************************
@post_routes.route("/create", methods=['POST'])
@login_required
def create_post():

    form = CreatePostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_post = Post(
            owner_id=current_user.id,
            post_title=form.data["post_title"],
            post_body=form.data["post_body"],
            post_img_url=form.data["post_img_url"]
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201
    # TODO need to figure out how to get the error valifator messges to appear in the route.
    return form.errors, 400

# *********************************
#  PUT Edit a Post Route
#**********************************
@post_routes.route("/<int:post_id>/edit", methods=["PUT"])
@login_required
def edit_post(post_id):
    post_edit = Post.query.get(post_id)

    if not post_edit:
        return {'Message': "This post most probably does not exist"}, 404

    if post_edit.owner_id != current_user.id:
        return {"Message": "You are not authoried to EDIT this post"}, 403

    form = CreatePostForm(obj=post_edit)

    # --- IMPORTANT DONT DELETE ---
    # REMEMBER TO ADD THIS LINE BELOW TO INJECT THE CSRF TOKEN
    # WHEN USING A FORM IN YOUR API ROUTE
    form['csrf_token'].data = request.cookies['csrf_token'] # IMPORTANT LINE OF CODE NEEDED EVERYTIME A FORM IS DECLARED

    if form.validate_on_submit():
        # This is a one liner to do the three lines of code below
        # --- USE WITH CAUTION ---
        # it can override data fields with similar naming conventions

        # form.populate_obj(obj=post_edit_id)

        post_edit.post_title=form.data["post_title"]
        post_edit.post_body=form.data["post_body"]
        post_edit.post_img_url=form.data["post_img_url"]

        # db.session.add(post_edit)
        db.session.commit()
        return post_edit.to_dict(), 200
    return form.errors, 400

# *********************************
#  DELETE Post Route
#**********************************
@post_routes.route('/<int:post_id>', methods=["DELETE"])
@login_required
def delete_post(post_id):

    post_delete = Post.query.get(post_id)

    # If the post you want to delete doesnt exist
    if not post_delete:
        return {"Message": f"Post with ID: {post_id} was not found"}, 404

    # If the logged in user wnats to deltete other posts that do not belong to them
    if post_delete.owner_id != current_user.id:
        return {"Message": "You are not authorized to DELETE this post"}, 403

    db.session.delete(post_delete)
    db.session.commit()
    return {"Message": "Your post was successfully DELETED"}, 200

# -------------------------- GET ALL COMMENTS FOR A POST -----------------------------#

# full endpoint : 'api/posts/<int:postID>/comments'
# no user auth to view all comments
@post_routes.route('/<int:postId>/comments', methods=["GET"]) # our endpoint is the postId number and the retrieval method is `GET`
def all_comments(postId): # we begin a function that will retrieve all comments attached to a post by its postId
    """
    View all comments on a post
    """
    # here we use the SQLAlchemy's filter_by to get all comments by the postId which should match a id in our post_id column in our comments table
    comments = Comment.query.filter_by(post_id=postId).all() 

    # Since Flask does not know how to turn Python objects into JSON on its own 
    # We use jsonify to convert the python into this universal readable object aka JSON response

    return ({'comments': [comment.to_dict() for comment in comments]}) 
    # what this now does is it gives us a list (via to_dict) of comments under the key "comments": {{comment1}, {comment2}, {etc}}


# --------------------------- POST A COMMENT ---------------------------------------#

# full endpoint : 'api/posts/<int:postId>/comment'
# user must be logged in and authenticated to create a comment on a post
@post_routes.route('/<int:postId>/comments', methods=['POST']) # creating a url with the method POST to post a comment
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
        return (new_comment.to_dict()), 200 # stays within the conditional gives output of new comment with username attached to it 
    else:
        return {'errors': form.errors}, 400 # our errors object will output what we specified in our form fields
        # example: 
        # {
        #   'comment_body': ["You gotta write a comment to leave a comment!"]
        # }