import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FollowsModal from '../FollowsModal/FollowsModal';
import './ProfilePage.css';

function ProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFollowsModal, setShowFollowsModal] = useState(false);

    // Fetch user data directly with fetch
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch user profile data
                const userResponse = await fetch(`http://127.0.0.1:5000/api/users/${userId}`);
                if (!userResponse.ok) {
                    throw new Error(`Failed to fetch user: ${userResponse.status}`);
                }
                const userData = await userResponse.json();

                // Fetch followers count
                const followersResponse = await fetch(`http://127.0.0.1:5000/api/follows/${userId}/followers`);
                const followersData = followersResponse.ok ? await followersResponse.json() : [];

                // Fetch following count
                const followingResponse = await fetch(`http://127.0.0.1:5000/api/follows/${userId}/following`);
                const followingData = followingResponse.ok ? await followingResponse.json() : [];

                // Combine all data
                setUser({
                    ...userData,
                    followersCount: followersData.length,
                    followingCount: followingData.length
                });

            } catch (err) {
                setError(err.message);
                console.error('Error fetching user data:', err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    if (loading) {
        return (
            <div className="profile-loading">
                <div className="loading-spinner"></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-error">
                <h2>Error loading profile</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-error">
                <h2>User not found</h2>
                <p>The profile you&apos;re looking for doesn&apos;t exist.</p>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="profile-info">
                        <h1 className="display-name">{user.username}</h1>
                        <p className="username">@{user.username}</p>
                        <p className="bio">{user.bio || 'No bio available'}</p>
                    </div>
                </div>

                {/* Profile Stats */}
                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-number">0</span>
                        <span className="stat-label">Posts</span>
                    </div>
                    
                    <button 
                        className="stat-item stat-button"
                        onClick={() => setShowFollowsModal(true)}
                    >
                        <span className="stat-number">{user.followersCount}</span>
                        <span className="stat-label">Followers</span>
                    </button>
                    
                    <button 
                        className="stat-item stat-button"
                        onClick={() => setShowFollowsModal(true)}
                    >
                        <span className="stat-number">{user.followingCount}</span>
                        <span className="stat-label">Following</span>
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="profile-actions">
                    <button className="follow-btn">Follow</button>
                </div>
            </div>

            {/* FollowsModal */}
            <FollowsModal 
                isOpen={showFollowsModal}
                onClose={() => setShowFollowsModal(false)}
                userId={parseInt(userId)}
            />
        </div>
    );
}

export default ProfilePage;