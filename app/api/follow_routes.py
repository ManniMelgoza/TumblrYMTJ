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
       follower_id=current_user.id,
       following_id=user_id
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
        follower_id=current_user.id, 
        following_id=user_id
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
    # STEP 1: Define a variable that queries all the people the current user is following
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    following = user.following
    # STEP 2: Return a neat list showing the username
    result = [{"username": f.following.username} for f in following]
    # STEP 3: If there is nobody in the query, display a message saying "Go and follow some people!"
    if not result:
        return jsonify({"message": "Go and follow some people!"})

    return jsonify(result)


# --------------------------------------------------------------------
# GET route that retrieves the followers list for a user.
# --------------------------------------------------------------------
@follow_routes.route("/<int:user_id>/followers", methods=["GET"])
@login_required
def user_followers(user_id):
    # STEP 1: Define a variable that queries all the followers for the current user
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    followers = user.followers
    # STEP 2: Return a neat list showing the username
    result = [{"username": f.follower.username} for f in followers]
    # STEP 3: If there is nobody in the query, display a message saying "Go and follow some people!"
    if not result:
        return jsonify({"message": "You will gain followers soon!"})

    return jsonify(result)
