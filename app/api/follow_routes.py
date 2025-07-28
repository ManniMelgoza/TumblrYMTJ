from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, User, Follow

# Creates a blueprint for the follow routes
follow_routes = Blueprint("follow_routes", __name__)


# ---------------------------------------------------------------
# POST route used to add a follow, or to "follow" another user.
# ---------------------------------------------------------------
@follow_routes.route("/<int:user_id>/following", methods=["POST"])
@login_required
def add_follow(user_id):
    # Step 1: Check if the current user is already following this user
    existing_follow = Follow.query.filter_by(
        follower_id=current_user.id, following_id=user_id
    ).first()

    # Step 2: Create the follow relationship if it doesn't exist
    if existing_follow:
        return jsonify({"message": "You are already following this user"}), 400

    new_follow = Follow(follower_id=current_user.id, following_id=user_id)
    db.session.add(new_follow)
    db.session.commit()

    # Step 3: Return a confirmation message
    return jsonify({"message": "You are now following this user!"})


# ---------------------------------------------------------------
# DELETE route used to "unfollow" another user.
# ---------------------------------------------------------------
@follow_routes.route("/<int:user_id>/following/unfollow", methods=["DELETE"])
@login_required
def remove_follow(user_id):
    # Step 1: Find the follow relationship
    follow = Follow.query.filter_by(
        follower_id=current_user.id, following_id=user_id
    ).first()

    # Step 2: Remove the relationship if it exists
    if follow:
        db.session.delete(follow)
        db.session.commit()
        return jsonify({"message": "Successfully unfollowed this user!"})

    # Step 3: Return an error if the relationship is not found
    return jsonify({"message": "You are not following this user"}), 404


# --------------------------------------------------------------------
# GET route that retrieves the following list for a user.
# --------------------------------------------------------------------
@follow_routes.route("/<int:user_id>/following", methods=["GET"])
@login_required
def user_following(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Query users that this user follows directly
    following = (
        db.session.query(User)
        .join(Follow, User.id == Follow.following_id)
        .filter(Follow.follower_id == user_id)
        .all()
    )

    result = [
        {"id": following_user.id, "username": following_user.username}
        for following_user in following
    ]
    return jsonify(result)


# --------------------------------------------------------------------
# GET route that retrieves the followers list for a user.
# --------------------------------------------------------------------
@follow_routes.route("/<int:user_id>/followers", methods=["GET"])
@login_required
def user_followers(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Query users who follow this user directly
    followers = (
        db.session.query(User)
        .join(Follow, User.id == Follow.follower_id)
        .filter(Follow.following_id == user_id)
        .all()
    )

    result = [
        {"id": follower.id, "username": follower.username} for follower in followers
    ]
    return jsonify(result)
