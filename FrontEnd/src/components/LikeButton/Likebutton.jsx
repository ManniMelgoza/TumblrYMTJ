import { useDispatch, useSelector } from "react-redux";
import { createLike, deleteLike, fetchLikes } from "../../redux/like";
import { useEffect, useState } from "react";

const LikeButton = ({ postId }) => {
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.likes);
  const sessionUser = useSelector((state) => state.session.user);
  const [userLike, setUserLike] = useState(null);

  useEffect(() => {
    if (postId) dispatch(fetchLikes(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (sessionUser && likes) {
      const likeArr = Object.values(likes);
      const foundLike = likeArr.find(
        (like) => like.post_id === postId && like.user_id === sessionUser.id
      );
      setUserLike(foundLike || null);
    }
  }, [likes, sessionUser, postId]);

  const handleLike = async () => {
    if (!userLike) {
      await dispatch(createLike(postId));
    } else {
      await dispatch(deleteLike(postId, userLike.id));
    }
  };

  return (
    <button onClick={handleLike}>
      {userLike ? "💔 Unlike" : "❤️ Like"}
    </button>
  );
};

export default LikeButton;