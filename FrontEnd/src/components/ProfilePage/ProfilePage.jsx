import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetUserPosts } from '../../redux/post';
import { Link } from 'react-router-dom';
import { FaRegCompass, FaPlus } from 'react-icons/fa';
import FollowsModal from '../FollowsModal/FollowsModal';
import './ProfilePage.css';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [showFollowsModal, setShowFollowsModal] = useState(false);
    const [followsModalType, setFollowsModalType] = useState('followers');
    
    const userPosts = useSelector(state => Object.values(state.posts));
    const user = useSelector(state => state.user?.profile || {});
    const currentUser = useSelector(state => state.session?.user);

    useEffect(() => {
        dispatch(thunkGetUserPosts());
    }, [dispatch]);

    const { username, bio, followers_count = 0, following_count = 0 } = user || {};
    const avatarLetter = username?.charAt(0).toUpperCase() || 'U';
    const postsCount = userPosts.length;

    const handleFollowersClick = () => {
        setFollowsModalType('followers');
        setShowFollowsModal(true);
    };

    const handleFollowingClick = () => {
        setFollowsModalType('following');
        setShowFollowsModal(true);
    };

    return (
        <div className="profile-layout">
            {/* Left Side Bar - 1/4 of screen */}
            <div className="left-section">
                <div className="logoImg">
                    <img src="ReelQuotesLogo.gif" alt="Logo" />
                </div>
                
                <nav className="nav-buttons">
                    <Link to="/" className="nav-link explorer-btn">
                        <FaRegCompass className="nav-icon" />
                        <span>Explorer</span>
                    </Link>
                    
                    {currentUser && (
                        <Link to="/create" className="nav-link create-btn">
                            <FaPlus className="nav-icon" />
                            <span>Create a New Post</span>
                        </Link>
                    )}
                </nav>
            </div>

            {/* Main Content - 3/4 of screen */}
            <div className="main-content">
                <div className="profile-container">
                    <div className="profile-header">
                        {/* Left side - Avatar, username, and bio */}
                        <div className="profile-left">
                            <div className="profile-avatar">{avatarLetter}</div>
                            <div className="profile-info-section">
                                <div className="profile-basic-info">
                                    <h1>{username}</h1>
                                    <p className="username">@{username}</p>
                                </div>
                                {bio && (
                                    <div className="profile-bio">
                                        <p className="bio">{bio}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right side - Stats list */}
                        <div className="profile-stats-list">
                            <div className="stat-item-list">
                                <span className="stat-number">{postsCount}</span>
                                <span className="stat-label">posts</span>
                            </div>
                            <button
                                className="stat-item-list stat-clickable"
                                onClick={handleFollowersClick}
                                type="button"
                            >
                                <span className="stat-number">{followers_count}</span>
                                <span className="stat-label">followers</span>
                            </button>
                            <button
                                className="stat-item-list stat-clickable"
                                onClick={handleFollowingClick}
                                type="button"
                            >
                                <span className="stat-number">{following_count}</span>
                                <span className="stat-label">following</span>
                            </button>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button className="follow-btn" type="button">
                            Follow
                        </button>
                    </div>
                </div>

                <div className="posts-section">
                    <h2>Posts</h2>
                    <div className="user-posts-container">
                        {postsCount === 0 && <p className="no-posts">No posts yet.</p>}
                        {postsCount > 0 &&
                            userPosts.map(post => (
                                <div key={post.id} className="post-card">
                                    <h3>{post.post_title}</h3>
                                    {post.post_img_url && (
                                        <img
                                            src={post.post_img_url}
                                            alt={post.post_title || 'Post image'}
                                            className="post-image"
                                        />
                                    )}
                                    <p>{post.post_body}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* FollowsModal */}
            {showFollowsModal && (
                <FollowsModal
                    isOpen={showFollowsModal}
                    onClose={() => setShowFollowsModal(false)}
                    userId={parseInt(userId)}
                    initialTab={followsModalType}
                />
            )}
        </div>
    );
};

export default ProfilePage;