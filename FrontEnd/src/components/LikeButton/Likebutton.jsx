import { useDispatch, useSelector } from "react-redux";
import { createLike, deleteLike, fetchLikes } from "../../redux/like";
import { useEffect, useState } from "react";
import "./LikeButton.css";

const LikeButton = ({ postId }) => {
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.likes); //access likes from the state
  const sessionUser = useSelector((state) => state.session.user); //gets the currently logged in user
  const [userLike, setUserLike] = useState(null); //checks if the user has liked a post
  const [likeCount, setLikeCount] = useState(0); //tracks the likes on a post, the default is always 0

  // Fetch likes when postId changes
  useEffect(() => {
    if (postId) {
      dispatch(fetchLikes(postId));
    }
  }, [dispatch, postId]);

  // Update userLike and likeCount when likes change
  useEffect(() => {
    if (likes && sessionUser) {
      const likeArr = Object.values(likes);
      const foundLike = likeArr.find( //checks if the user liked this post already
        (like) => like.post_id === postId && like.user_id === sessionUser.id
      );
      setUserLike(foundLike || null);

      const totalLikesForPost = likeArr.filter((like) => like.post_id === postId).length;
      setLikeCount(totalLikesForPost); //counts how many likes are on this post
    }
  }, [likes, sessionUser, postId]);


  //toggle like/delete like
  const handleLike = async () => {
    if (!userLike) {
      await dispatch(createLike(postId)); //user is liking the post
    } else {
      await dispatch(deleteLike(postId, userLike.id)); //user has already liked the post and is unliking it
    }

    // Refetch updated likes after change
    dispatch(fetchLikes(postId));//this way users dont have to manually refresh
  };

  return (
    <button onClick={handleLike} className="like-button">
      {userLike ? "💔" : "❤️"} {likeCount}
    </button>
  );
};

export default LikeButton;