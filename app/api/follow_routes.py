from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, User, Follow

# Creates a blueprint for the follow routes
follow_routes = Blueprint("follow_routes", __name__)


# ---------------------------------------------------------------
# POST route used to add a follow, or to "follow" another user.
# ---------------------------------------------------------------
@follow_routes.route("/follows", methods=["POST"])
@login_required
def add_follow():
    # Step 1: Gather data from the request
    data = request.json

    # Step 2: Check to see if the info we have is correct
    if not data or "following_id" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Step 3: Find the user we are trying to follow
        following_user = User.query.get(data["following_id"])

        # Step 4: Check to see if the user actually exists
        if not following_user:
            return jsonify({"error": "User not found"}), 404

        # Step 5: Check to see if the current user is already following the user
        existing_follow = Follow.query.filter_by(
            follower_id=current_user.id, following_id=following_user.id
        ).first()

        if existing_follow:
            return jsonify({"error": "You are already following this user"}), 400

        # Step 6: If they aren't already following the user, create a new follow relationship
        new_follow = Follow(follower_id=current_user.id, following_id=following_user.id)

        # Step 7: Adds the new follow relationship to the database
        db.session.add(new_follow)
        db.session.commit()

        # Step 8: Return a JSON response with the followed user's username & new follower/following count
        return (
            jsonify(
                {
                    "message": f"Following {following_user.username}",  # Changed as requested
                    "following_id": following_user.id,
                    "following_count": len(current_user.following),
                    "followers_count": len(following_user.followers),
                }
            ),
            201,
        )

    except Exception as e:
        # Step 9: If anything goes amuck, undo any changes and return an error
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# ---------------------------------------------------------------
# DELETE route used to "unfollow" another user.
# ---------------------------------------------------------------
@follow_routes.route(
    "/follows/<int:following_id>", methods=["DELETE"]
)  # Fixed typo: folllows -> follows
@login_required
def remove_follow(following_id):
    try:
        # Step 1: Finds the follow relationship
        follow = Follow.query.filter_by(
            follower_id=current_user.id, following_id=following_id
        ).first()

        # Step 2: Checks to see if the follow relationship exists
        if not follow:
            return jsonify({"error": "You are not following this user"}), 404

        # Step 3: Get the user info before deleting the relationship
        following_user = User.query.get(following_id)

        # Step 4: Removes the follow relationship
        db.session.delete(follow)
        db.session.commit()

        # Step 5: Return success message with updated counts
        return (
            jsonify(
                {
                    "message": f"Unfollowed {following_user.username}",
                    "following_count": len(current_user.following),
                    "followers_count": len(following_user.followers),
                }
            ),
            200,
        )

    except Exception as e:
        # Step 6: If anything goes amuck, undo any changes and return an error
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# -----------------------------------------------------------------
# GET route that retrieves the followers or following list for a user.
# ----------------------------------------------------------------
@follow_routes.route("/follows/<int:user_id>", methods=["GET"])
@login_required
def get_user_follows(user_id):
    # Step 1: Get the type of follow list that needs to be retrieved
    follow_type = request.args.get("type", "following")

    try:
        # Step 2: Find the user
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Step 3: Find the appropriate relationship based on the request type
        if follow_type == "followers":
            follows = user.followers
        elif follow_type == "following":
            follows = user.following
        else:
            return jsonify({"error": "Invalid follow type"}), 400

        # Step 4: Format the response with follow details
        result = [
            {
                "id": f.id,
                "created_at": (
                    f.created_at.isoformat() if hasattr(f, "created_at") else None
                ),
                "user": {
                    "id": (
                        f.follower.id if follow_type == "followers" else f.following.id
                    ),
                    "username": (
                        f.follower.username
                        if follow_type == "followers"
                        else f.following.username
                    ),
                },
            }
            for f in follows
        ]

        # Step 5: Return the formatted response
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------------------------------------------
# GET route used to check if the current user follows another user.
# -------------------------------------------------------------------
@follow_routes.route("/follows/check", methods=["GET"])
@login_required
def check_follow():
    # Step 1: Gets the following_id from the request arguments
    following_id = request.args.get("following_id", type=int)

    # Step 2: Checks to see if the following_id is existing
    if not following_id:
        return jsonify({"error": "Missing required parameters"}), 400

    try:
        # Step 3: Checks for an existing follow relationship
        result = Follow.query.filter_by(
            follower_id=current_user.id, following_id=following_id
        ).first()

        # Step 4: Returns a JSON response indicating if the user is following the other user
        return jsonify({"isFollowing": result is not None})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def register_routes(app):
    app.register_blueprint(follow_routes)
