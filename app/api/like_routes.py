from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Like, User

like_routes = Blueprint('likes', __name__)

# GET route to pull all likes on a post
@like_routes.route('/<int:post_id>', methods=['GET'])
def get_likes(post_id):
    likes = Like.query.filter_by(post_id=post_id).join(User).all()
    return [{
        "id": like.id,
        "post_id": like.post_id,
        "user": {
            "id": like.user.id,
            "username": like.user.username
        }
    } for like in likes]

# POST route to add a new like (toggle behavior optional)
@like_routes.route('/<int:post_id>', methods=['POST'])
@login_required
def like_post(post_id):
    existing_like = Like.query.filter_by(post_id=post_id, user_id=current_user.id).first()
    #check if a user has liked the post yet

    if existing_like:
        # Already liked > remove the like
        db.session.delete(existing_like)
        db.session.commit()
        return {
            "liked": False,
            "post_id": post_id,
            "user": {
                "id": current_user.id,
                "username": current_user.username
            }
        }

    
    #if a post hasnt been liked yet, then create the like
    new_like = Like(user_id=current_user.id, post_id=post_id)
    db.session.add(new_like)
    db.session.commit()
    return {
        "liked": True,
        "post_id": post_id,
        "user": {
            "id": current_user.id,
            "username": current_user.username
        },
        "like_id": new_like.id
    }


# DELETE route to remove a like
@like_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def unlike_post(post_id):
    like = Like.query.filter_by(post_id=post_id, user_id=current_user.id).first()
    if not like:
        return {"error": "Like does not exist"}, 404
    db.session.delete(like)
    db.session.commit()
    return {"message": "Like removed"}