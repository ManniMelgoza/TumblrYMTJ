import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LikeButton from "../LikeButton";
import { Link } from "react-router-dom";
import { FaRegCompass } from "react-icons/fa";
import { useEffect, useState } from "react";
import { thunkGetAllPosts } from "../../redux/post";

const PostDetailPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => state.posts[postId]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        await dispatch(thunkGetAllPosts());
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [dispatch]);

  // Show loading while fetching data
  if (isLoading) {
    return (
      <>
        <div className="post-detail">
          <h2>Loading...</h2>
        </div>

        <div className="logoColumn">
          <div className="logoWrapper">
            <div className="logoImg">
              <img src="RQ.png" />
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
      </>
    );
  }

  // Show error if post not found after loading
  // if (!post) {
  //   return (
  //     <>
  //       <div className="post-detail">
  //         <h2>Post not found</h2>
  //         <Link to="/">← Back to Home</Link>
  //       </div>

  //       <div className="logoColumn">
  //         <div className="logoWrapper">
  //           <div className="logoImg">
  //             <img src="ReelQuotesLogo.gif" alt="Logo" />
  //           </div>
  //         </div>
  //         <div className="navButtons">
  //           <Link to="/" className="newSpotLink">
  //             <FaRegCompass /> Explore
  //           </Link>
  //           <Link to="/create" className="newSpotLink">
  //             Create a Post
  //           </Link>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  // Render the post when data is loaded
  return (
    <>
    <div className="main-content">
      <h1 className="browse-post-title">{ post.post_title }</h1>
        <img src={post.post_img_url} alt={post.post_title} />
        <p>{post.post_body}</p>
        <LikeButton postId={post.id} />
      {/* <div className="post-detail"> */}
        {/* <h1>{post.post_title}</h1> */}
      {/* </div> */}
    </div>
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
    </>
  );
};

export default PostDetailPage;
