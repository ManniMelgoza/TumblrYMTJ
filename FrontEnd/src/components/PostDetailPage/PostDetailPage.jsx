import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LikeButton from "../LikeButton";

const PostDetailPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => state.posts[postId]);

  if (!post) return <h2>Post not found</h2>;

  return (
    <div className="post-detail">
      <h1>{post.post_title}</h1>
      <img src={post.post_img_url} alt={post.post_title} />
      <p>{post.post_body}</p>
      <LikeButton postId={post.id} />
    </div>
  );
};

export default PostDetailPage;
