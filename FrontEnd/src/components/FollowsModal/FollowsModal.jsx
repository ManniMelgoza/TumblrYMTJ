import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser
} from '../../redux/follow';
import './FollowsModal.css';

function FollowsModal({ isOpen, onClose, userId, initialTab }) {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(initialTab || 'followers');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Grab followers/following from Redux
  const followersUsers = useSelector(state => Object.values(state.follows.followers));
  const followingUsers = useSelector(state => Object.values(state.follows.following));

  // Fetch followers and following from backend using thunks
  const fetchFollowers = async () => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(getFollowers(userId));
    } catch (err) {
      setError('Failed to load followers');
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowing = async () => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(getFollowing(userId));
    } catch (err) {
      setError('Failed to load following');
    } finally {
      setLoading(false);
    }
  };

  // On modal open or userId change, fetch both lists
  useEffect(() => {
    if (isOpen && userId) {
      fetchFollowers();
      fetchFollowing();
    }
  }, [isOpen, userId]);

  // Reset tab if initialTab changes
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  // Follow or unfollow handlers using Redux
  const handleFollow = async (targetUserId) => {
    try {
      await dispatch(followUser(targetUserId));
      await fetchFollowing();
    } catch (err) {
      setError('Failed to follow user');
    }
  };

  const handleUnfollow = async (targetUserId) => {
    try {
      await dispatch(unfollowUser(targetUserId));
      await fetchFollowing();
    } catch (err) {
      setError('Failed to unfollow user');
    }
  };

  // Helper to choose the right list
  const getCurrentUsers = () => {
    return activeTab === 'following' ? followingUsers : followersUsers;
  };

  const getEmptyMessage = () =>
    activeTab === 'following'
      ? 'Go and follow some people!'
      : 'You will gain followers soon!';

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Connections</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'following' ? 'active' : ''}`}
            onClick={() => setActiveTab('following')}
          >
            Following ({followingUsers.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'followers' ? 'active' : ''}`}
            onClick={() => setActiveTab('followers')}
          >
            Followers ({followersUsers.length})
          </button>
        </div>

        <div className="modal-body">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              Loading...
            </div>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  activeTab === 'followers' ? fetchFollowers() : fetchFollowing();
                }}
                className="retry-button"
              >
                Retry
              </button>
            </div>
          ) : getCurrentUsers().length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <p>{getEmptyMessage()}</p>
              <div className="debug-info">
                Debug: {activeTab} = {getCurrentUsers().length} users
              </div>
            </div>
          ) : (
            <div className="users-list">
              {getCurrentUsers().map(user => (
                <div key={user.id} className="user-item">
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="user-details">
                      <div className="username">@{user.username}</div>
                    </div>
                  </div>
                  <div className="user-actions">
                    {activeTab === 'following' ? (
                      <button
                        className="unfollow-btn"
                        onClick={() => handleUnfollow(user.id)}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className="follow-btn"
                        onClick={() => handleFollow(user.id)}
                      >
                        Follow Back
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowsModal;
