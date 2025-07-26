//added by TJ
//this is just to show off likes on a post
//we can remove/change/delete this as needed


import { Link } from "react-router-dom";
import LikeButton from "../LikeButton";
import './PostCard.css';

const PostCard = ({ post }) => {
  if (!post) return null; 

  return (
    <Link to={`/posts/${post.id}`} className="post-card"> 
      <img src={post.post_img_url} alt={post.post_title} />
      <div className="post-title">{post.post_title}</div>
      <div className="post-body">{post.post_body}</div>
      <div className="like-button-container">
        <LikeButton postId={post.id} />
      </div>
    </Link>
  );
};

export default PostCard;