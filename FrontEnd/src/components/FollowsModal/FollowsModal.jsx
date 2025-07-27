import { useState, useEffect } from 'react';
import './FollowsModal.css';

function FollowsModal({ isOpen, onClose, userId }) {

    // Load data when modal opens
    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            // Simulate API call delay
            setTimeout(() => {
                setFollowingUsers(mockFollowing);
                setFollowersUsers(mockFollowers);
                setLoading(false);
            }, 800);
        }
    }, [isOpen]);

    // Event handlers
    const handleUnfollow = (targetUserId) => {
        setFollowingUsers(followingUsers.filter(user => user.id !== targetUserId));
        console.log(`Unfollowed user ${targetUserId}`);
    };

    const handleFollow = (targetUserId) => {
        console.log(`Followed user ${targetUserId}`);
        // In real implementation, you'd make API call and update state
    };

    // Helper functions
    const getCurrentUsers = () => {
        return activeTab === 'following' ? followingUsers : followersUsers;
    };

    const getEmptyMessage = () => {
        return activeTab === 'following' 
            ? 'Go and follow some people!' 
            : 'You will gain followers soon!';
    };

    // Don't render if modal is closed
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="modal-header">
                    <h2>Connections</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                
                {/* Tab Navigation */}
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
                
                {/* Tab Content */}
                <div className="modal-body">
                    {loading ? (
                        <div className="loading">
                            <div className="spinner"></div>
                            Loading...
                        </div>
                    ) : getCurrentUsers().length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">👥</div>
                            <p>{getEmptyMessage()}</p>
                        </div>
                    ) : (
                        <div className="users-list">
                            {getCurrentUsers().map(user => (
                                <div key={user.id} className="user-item">
                                    <div className="user-info">
                                        <div className="user-avatar">
                                            {user.username.charAt(0).toUpperCase()}
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