
// import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllPosts } from "../../redux/post";
import './LandingPage.css';
import { useEffect } from "react";

const LandingPage = () => {
    const dispatch = useDispatch();

    const postsList = useSelector((state) => state.posts);
    console.log('Post List', postsList);
    const postsArr = Object.values(postsList);
    console.log('All the posts', postsArr);

    useEffect(() => {
        dispatch(thunkGetAllPosts());
    }, [dispatch]);

    return (
        <>
             {/* Logo -> Explore -> Sign Up and Log In button -> Column Div */}
            <div>

            </div>

            {/* Title and Create Post Button -> Horizontal Div */}
            <h1>Browse Posts</h1>
            <button>Create a Post</button>

            {/* IMAGE DISPLAY BLOCKs */}
            {/* IMAGE WRAPPER */}
            <div>
                {/* Main Large Post Left */}
                <div>
                    <h1>Main Image</h1>
                </div>
                {/* Display small posts 2 Rows and 3 post per Row */}
                <div>
                    <h1>Small images</h1>
                        <div className='grid'>
                            {postsArr.slice(0, 6).map((post) => (
                                <div key={post.id} className="post-card">
                                {/* <h2>{post.post_title}</h2> */}
                                {/* <p>{post.post_body}</p> */}
                                {<img src={post.post_img_url} alt={post.post_title} />}
                                </div>
                            ))}
                        </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;
