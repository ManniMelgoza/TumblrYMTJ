import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LikeButton from "../LikeButton";
import { Link } from "react-router-dom";
import { FaRegCompass } from "react-icons/fa";
import { useEffect } from "react";
import { thunkGetAllPosts } from "../../redux/post";
import "./PostDetailPage.css";

const PostDetailPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => state.posts[postId]);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(thunkGetAllPosts());
  }, [dispatch]);

  const handleDelete = async () => {
  const confirmed = window.confirm("Are you sure you want to delete this post?");
  if (!confirmed) return;

  const response = await fetch(`/api/posts/${post.id}`, {
    method: "DELETE"
  });

  if (response.ok) {
    alert("Post deleted!");
    navigate("/");
  } else {
    const data = await response.json();
    alert(data?.Message || "Failed to delete the post.");
  }
};

  // Render the post when data is loaded
  return (
    <div className="landing-container">
      {/* Sidebar first - same order as landing page */}
      <div className="logoColumn">
        <div className="logoWrapper">
          <div className="logoImg">
            <img src="ReelQuotesLogo.gif" alt="Logo" />
          </div>
        </div>

        <div className="navButtons">
          <Link to="/" className="newSpotLink">
            <FaRegCompass /> Explore
          </Link>
          <Link to="/create" className="newSpotLink">
            Create a Post
          </Link>
        </div>
      </div>

      {/* Main content second - same order as landing page */}
      <div className="main-content">
        <h1 className="browse-post-title">{post?.post_title}</h1>
        <img src={post?.post_img_url} alt={post?.post_title} />
        <p>{post?.post_body}</p>
        <LikeButton postId={post?.id} />
        {sessionUser && post?.owner_id === sessionUser.id && (
        <button 
        onClick={handleDelete}
        style={{
         backgroundColor: 'red',
         color: 'white',
         padding: '10px 16px',
         fontWeight: 'bold',
         borderRadius: '6px',
         border: 'none'
  }}
>
  Delete Post
</button>
        )}

      </div>
    </div>
  );
};

export default PostDetailPage;
