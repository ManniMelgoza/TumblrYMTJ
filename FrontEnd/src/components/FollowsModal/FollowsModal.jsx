import { useState, useEffect } from 'react';
import axios from 'axios';
import './FollowsModal.css';

function FollowsModal({ isOpen, onClose, userId, initialTab }) {
    const [activeTab, setActiveTab] = useState(initialTab || 'followers');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [followersUsers, setFollowersUsers] = useState([]);

    // Function to fetch followers
    const fetchFollowers = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(`/api/follows/${userId}/followers`);

            const followersData = Array.isArray(response.data) ? response.data : [];
            setFollowersUsers(followersData);

        } catch (err) {
            setError("Failed to load followers");
            setFollowersUsers([]);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch following
    const fetchFollowing = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(`/api/follows/${userId}/following`);

            const followingData = Array.isArray(response.data) ? response.data : [];
            setFollowingUsers(followingData);

        } catch (err) {
            setError("Failed to load following");
            setFollowingUsers([]);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch data when modal opens or userId changes
    useEffect(() => {
        if (isOpen && userId) {

            setFollowersUsers([]);
            setFollowingUsers([]);
            setError(null);

            fetchFollowers();
            fetchFollowing();
        }
    }, [isOpen, userId]);

    // Update activeTab when initialTab changes
    useEffect(() => {
        if (initialTab) {
            setActiveTab(initialTab);
        }
    }, [initialTab]);

    // Event handlers
    const handleUnfollow = async (targetUserId) => {
        try {
            await axios.delete(`/api/follows/${targetUserId}`);

            setFollowingUsers(prev => prev.filter(user => user.id !== targetUserId));

        } catch (err) {
            console.error('❌ Error unfollowing user:', err);
            setError('Failed to unfollow user');
        }
    };

    const handleFollow = async (targetUserId) => {
        try {
            await axios.post(`/api/follows/${targetUserId}`);

            fetchFollowing();

        } catch (err) {
            setError('Failed to follow user');
        }
    };

    // Helper functions
    const getCurrentUsers = () => {
        const users = activeTab === 'following' ? followingUsers : followersUsers;
        return users;
    };

    const getEmptyMessage = () => {
        return activeTab === 'following'
            ? 'Go and follow some people!'
            : 'You will gain followers soon!';
    };


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
                        onClick={() => {
                            setActiveTab('following');
                        }}
                    >
                        Following ({followingUsers.length})
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'followers' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('followers');
                        }}
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
                                    if (activeTab === 'followers') {
                                        fetchFollowers();
                                    } else {
                                        fetchFollowing();
                                    }
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