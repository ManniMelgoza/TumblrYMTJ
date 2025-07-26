
// import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllPosts } from "../../redux/post";
import './LandingPage.css';
import { useEffect } from "react";
import { FaRegCompass } from "react-icons/fa";
//import Likebutton from "../LikeButton"; //added by tj
import PostCard from "../PostCard/PostCard"; //added by tj


const LandingPage = () => {
    const dispatch = useDispatch();

    const postsList = useSelector((state) => state.posts);
    console.log('Post List', postsList);
    const postsArr = Object.values(postsList);
    console.log('All the posts', postsArr);

    useEffect(() => {
        dispatch(thunkGetAllPosts());
    }, [dispatch]);

// Random Image Selector Section
    const postImagesList = postsArr.map(post => post.post_img_url).filter(Boolean);
    console.log('POST IMG LIST', postImagesList)

    const randomIndex = Math.floor(Math.random() * postsArr.length);
    console.log('Rand Indx', randomIndex)
    const selectedImage = postImagesList[randomIndex];
    console.log('SELECTED IMG', selectedImage)

    return (
        <>
            <h1 className="browse-post-title">Browse Posts</h1>
        <div className="landing-container">
             {/* Logo -> Explore -> Sign Up and Log In button -> Column Div */}
            <div className = "logoColumn">
            {/* Title and Create Post Button -> Horizontal Div */}
            <FaRegCompass /> <button>Explore</button>
            <button>Create a Post</button>
            </div>

            {/* IMAGE DISPLAY BLOCKs */}
            {/* IMAGE WRAPPER */}
            <div className="image-wrapper">
                {/* Main Large Post Left */}
                <div className="mainImgSection">
                    {/* <h1>Main Image</h1> */}
                    <div className ='mainGridImg'>
                        <div className ='mainImg-card'>
                            {
                                <img src={ selectedImage } alt={ postsArr.post_title } />
                            }
                        </div>
                    </div>
                </div>
                {/* Display small posts 2 Rows and 3 post per Row */}
                <div className="smallImgSection">
                    {/* <h1>Small images</h1> */}
                        <div className='grid'>
                           {postsArr.slice(0, 6).map((post) =>
                                post ? <PostCard key={post.id} post={post} /> : null
                            )}
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default LandingPage;
