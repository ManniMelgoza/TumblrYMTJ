import { useDispatch, useSelector } from "react-redux";
import { createLike, deleteLike, fetchLikes, selectLikesForPost, selectUserLikeForPost, selectLikeCountForPost } from "../../redux/like";
import { useEffect, useState } from "react";
import "./LikeButton.css";
import Modal from "react-modal";

const LikeButton = ({ postId, compact = false }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  
  // Use the selectors directly
  const likesForPost = useSelector(selectLikesForPost(postId));
  const userLike = useSelector((state) => selectUserLikeForPost(postId, sessionUser?.id)(state));
  const likeCount = useSelector(selectLikeCountForPost(postId));
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch likes when postId changes
  useEffect(() => {
    if (!postId) return;
    
    const loadData = async () => {
      setIsLoading(true);
      try {
        await dispatch(fetchLikes(postId));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [dispatch, postId]);


  // Toggle like/delete like
  const handleLike = async () => {
    if (!sessionUser) return; // Prevent liking if not logged in
    
    if (!userLike) {
      await dispatch(createLike(postId));
    } else {
      await dispatch(deleteLike(postId, userLike.id));
    }
    // No need to fetchLikes here if your backend returns updated state
  };

  const openModal = () => {
    if (likeCount > 0) setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const usersWhoLiked = likesForPost
  .map(like => like.user?.username)
  .filter(Boolean);

  return (
    <div className={`like-container ${compact ? 'compact' : ''}`}>
      {isLoading ? (
        <div className="like-loading">...</div>
      ) : (
        <>
          <button 
            onClick={handleLike} 
            className={`like-button ${userLike ? 'liked' : ''}`}
            aria-label={userLike ? "Unlike post" : "Like post"}
>
  <span className="heart-icon">♥</span>
</button>
          <span 
            onClick={likeCount > 0 ? openModal : undefined} 
            className={`like-count ${likeCount > 0 ? 'clickable' : ''}`}
          >
            {likeCount}
          </span>
        </>
      )}
      
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
          {usersWhoLiked.length > 0 ? (
            usersWhoLiked.map((username, index) => (
              <li key={index}>{username}</li>
            ))
          ) : (
            <li>No likes yet</li>
          )}
        </ul>
      </Modal>
    </div>
  );
};

export default LikeButton;