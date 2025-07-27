//added by TJ
//this is just to show off likes on a post
//we can remove/change/delete this as needed


import { Link } from "react-router-dom";
import LikeButton from "../LikeButton";
import './PostCard.css';

const PostCard = ({ post }) => {
  if (!post) return null;

  return (
    <div className="post-card-container">
      <Link to={`/posts/${post.id}`} className="post-card-content">
        <img src={post.post_img_url} alt={post.post_title} />
        <div className="post-title">{post.post_title}</div>
        <div className="post-body">{post.post_body}</div>
      </Link>
      
      <div className="post-card-footer">
        <LikeButton postId={post.id} compact={true} />
      </div>
    </div>
  );
};

export default PostCard;
