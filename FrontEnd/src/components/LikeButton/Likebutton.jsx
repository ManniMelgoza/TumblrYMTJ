import { useDispatch, useSelector } from "react-redux";
import { createLike, deleteLike, fetchLikes } from "../../redux/like";
import { useEffect, useState } from "react";
import "./LikeButton.css";
import Modal from "react-modal";

const LikeButton = ({ postId }) => {
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.likes); //access likes from the state
  const sessionUser = useSelector((state) => state.session.user); //gets the currently logged in user
  const [userLike, setUserLike] = useState(null); //checks if the user has liked a post
  const [likeCount, setLikeCount] = useState(0); //tracks the likes on a post, the default is always 0
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [usersWhoLiked, setUsersWhoLiked] = useState([]);


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

      const postLikes = likeArr.filter((like) => like.post_id === postId);
      setLikeCount(postLikes.length);
      
      setUsersWhoLiked(postLikes.map(like => like.user?.username || 'Unknown'));
    }
  }, [likes, sessionUser, postId]);


  //toggle like/delete like
   const handleLike = async () => {
    if (!userLike) {
      await dispatch(createLike(postId));
    } else {
      await dispatch(deleteLike(postId, userLike.id));
    }
    dispatch(fetchLikes(postId));
  };

  const openModal = () => {
    if (likeCount > 0) {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
  <div className="like-container">
    <button onClick={handleLike} className={`like-button ${userLike ? 'liked' : ''}`}>
      {userLike ? (
        <span className="heart-icon">❤️</span>  
      ) : (
        <span className="heart-icon">🤍</span>  
      )}
    </button>
    <span 
      onClick={likeCount > 0 ? openModal : undefined} 
      className={`like-count ${likeCount > 0 ? 'clickable' : ''}`}
    >
      {likeCount}
    </span>
    
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Users who liked this post"
      className="likes-modal"
      overlayClassName="likes-modal-overlay"
    >
      <h2>Liked by</h2>
      <button onClick={closeModal} className="close-modal">×</button>
      <ul className="likers-list">
        {usersWhoLiked.map((username, index) => (
          <li key={index}>{username}</li>
        ))}
      </ul>
    </Modal>
  </div>
)};


export default LikeButton;