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

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError(null);

            try {
                const userResponse = await fetch(`http://127.0.0.1:5000/api/users/${userId}`);
                if (!userResponse.ok) {
                    throw new Error(`Failed to fetch user: ${userResponse.status}`);
                }
                const userData = await userResponse.json();

                const followersResponse = await fetch(`http://127.0.0.1:5000/api/follows/${userId}/followers`);
                const followersData = followersResponse.ok ? await followersResponse.json() : [];

                const followingResponse = await fetch(`http://127.0.0.1:5000/api/follows/${userId}/following`);
                const followingData = followingResponse.ok ? await followingResponse.json() : [];

                setUser({
                    ...userData,
                    followersCount: followersData.length,
                    followingCount: followingData.length
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    if (loading) return <div className="profile-loading">Loading profile...</div>;
    if (error) return <div className="profile-error">Error: {error}</div>;
    if (!user) return <div className="profile-error">User not found</div>;

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="profile-info">
                        <h1>{user.username}</h1>
                        <p>@{user.username}</p>
                        <p>{user.bio || 'No bio available'}</p>
                    </div>
                </div>

                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-number">0</span>
                        <span className="stat-label">Posts</span>
                    </div>
                    <button className="stat-item stat-button" onClick={() => setShowFollowsModal(true)}>
                        <span className="stat-number">{user.followersCount}</span>
                        <span className="stat-label">Followers</span>
                    </button>
                    <button className="stat-item stat-button" onClick={() => setShowFollowsModal(true)}>
                        <span className="stat-number">{user.followingCount}</span>
                        <span className="stat-label">Following</span>
                    </button>
                </div>

                <div className="profile-actions">
                    <button className="follow-btn">Follow</button>
                </div>
            </div>

            <FollowsModal
                isOpen={showFollowsModal}
                onClose={() => setShowFollowsModal(false)}
                userId={parseInt(userId)}
            />
        </div>
    );
}

export default ProfilePage;