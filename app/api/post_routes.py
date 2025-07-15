from flask import Blueprint, request
from app.models import Post, db
from app.forms import CreatePostForm
from flask_login import login_required
# TODO DO WE NEED THE FLASK_LOGIN
# would we need the log in to be able to create a post since you will already be logged in
# from flask_login import current_user, login_user, logout_user, login_required


# Would this be a predix if we want to add post to the url/post
# url_prefix='/posts/'
post_routes = Blueprint('posts', __name__)

# GETS ALL POSTS
# if we had a url predix url/post
@post_routes.route("/", methods=['GET'])
def all_posts():
    posts = Post.query.all()
    return {'Posts': [post.to_dict() for post in posts]}

# TODO NEED TO ADD BODY VALIDATOR ERRO MSGs
# CREATE A NEW POST
# if we had a url predix url/post/username/create
@post_routes.route("/<string:username>/create", methods=['GET','POST'])
@login_required
def create_post():

    form = CreatePostForm()

    if form.validate_on_submit():
        new_post = Post(
            # "id": len()
            post_title=form.data["post_title"],
            post_body=form.data["post_body"],
            post_img_url=form.data["post_img_url"],
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 200
    # TODO need to figure out how to get the error valifator messges to appear in the route.
    return form.errors, 400

# EDIT A POST
@post_routes.route("/<string:username>/<int:post_id>/edit", methods={"GET", "POST"})
@login_required
def edit_post(post_id):

    post_edit = Post.query.get(post_id)

    if not post_edit:
        return {'Message': "This post most probably does not exist"}, 404

    # we are reusing the form to create a post, but now we are
    # passsing the sigle post as an obj to the form
    form = CreatePostForm(obj=post_edit)

    if form.validate_on_submit():
        # This is a one liner to do the three lines of code below
        # USE WITH CAUTION it can override data fields with similar naming conventions
        # form.populate_obj(obj=post_edit_id)

        post_edit.post_title=form.data["post_title"],
        post_edit.post_body=form.data["post_body"],
        post_edit.post_img_url=form.data["post_img_url"],

        db.session.add()
        db.session.commit()
        return edit_post.to_dict(), 200
    return form.errors, 400

@post_routes.route('/<string:username>/<int:post_id>', methods=["DELETE"])
@login_required
def delete_post(post_id):

    post_delete = Post.query.get(post_id)

    if not post_delete:
        return {"Message": "Your post was successfully deleted"}, 200

    db.session.delete(post_delete)
    db.commit()
    return {"Message": "Your post was successfully deleted"}, 404
