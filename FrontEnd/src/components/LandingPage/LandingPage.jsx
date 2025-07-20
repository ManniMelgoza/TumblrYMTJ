
// import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots } from "../../redux/post/post.js"
import './LandingPage.css';
import { useEffect } from "react";

const LandingPage = () => {
    const dispatch = useDispatch();

    const postsList = useSelector((state) => state.posts);
    console.log(postsList);
    const postsArr = Object.values(postsList);
    console.log(postsArr);

    useEffect(() => {
        dispatch(thunkGetAllSpots());
    }, [dispatch]);

    return (
        <>
             {/* Logo -> Explore -> Sign Up and Log In button -> Column Div */}
            <div>

            </div>

            {/* Title and Create Post Button -> Horizontal Div */}
            <div>
                <h1>Browse Posts</h1>
                <button>Create a Post</button>
            </div>

            {/* IMAGE DISPLAY BLOCKs */}
            {/* IMAGE WRAPPER */}
            <div>

                {/* Main Large Post Left */}
                <div>

                </div>

                {/* Display small posts 2 Rows and 3 post per Row */}
                <div>

                </div>

            </div>

        </>
    )
}

export default LandingPage;
