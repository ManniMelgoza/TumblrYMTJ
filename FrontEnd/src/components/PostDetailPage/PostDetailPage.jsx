import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LikeButton from "../LikeButton";
import { Link } from "react-router-dom";
import { FaRegCompass } from "react-icons/fa";
import { useEffect } from "react";
import { thunkGetAllPosts } from "../../redux/post";

const PostDetailPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => state.posts[postId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllPosts());
  }, [dispatch]);

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
      </div>
    </div>
  );
};

export default PostDetailPage;
