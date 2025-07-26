from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Like, Post

like_routes = Blueprint('likes', __name__)

# GET route to pull all likes on a post
@like_routes.route('/<int:post_id>', methods=['GET'])
def get_likes(post_id):
    likes = Like.query.filter_by(post_id=post_id).all()
    return jsonify([like.to_dict() for like in likes])


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
        return jsonify({
            "liked": False,
            "post_id": post_id,
            "user_id": current_user.id,
            "like_id": None
        }), 200
    
    #if a post hasnt been liked yet, then create the like
    new_like = Like(user_id=current_user.id, post_id=post_id)
    db.session.add(new_like)
    db.session.commit()
    return jsonify({
        "liked": True,
        "post_id": post_id,
        "user_id": current_user.id,
        "like_id": new_like.id
    }), 200


# DELETE route to remove a like
@like_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def unlike_post(post_id):
    like = Like.query.filter_by(post_id=post_id, user_id=current_user.id).first()

    if not like:
        return jsonify({"error": "Like does not exist"}), 404

    db.session.delete(like)
    db.session.commit()
    return {"message": "Like removed"}