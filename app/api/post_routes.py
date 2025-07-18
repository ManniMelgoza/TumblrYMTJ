from flask import Blueprint, request
from app.models import Post, db
from app.forms import CreatePostForm
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)

# *********************************
#       GET All Posts Route
#**********************************
@post_routes.route("/", methods=['GET'])
def all_posts():
    posts = Post.query.all()
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
