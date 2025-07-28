
// // import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { thunkGetAllPosts } from "../../redux/post";
// import './LandingPage.css';
// import { useEffect } from "react";
// import { FaRegCompass } from "react-icons/fa";
// //import Likebutton from "../LikeButton"; //added by tj
// import PostCard from "../PostCard/PostCard"; //added by tj


// const LandingPage = () => {
//     const dispatch = useDispatch();

//     const postsList = useSelector((state) => state.posts);
//     // console.log('Post List', postsList);
//     const postsArr = Object.values(postsList);
//     // console.log('All the posts', postsArr);

//     useEffect(() => {
//         dispatch(thunkGetAllPosts());
//     }, [dispatch]);

// // Random Image Selector Section
//     const postImagesList = postsArr.map(post => post.post_img_url).filter(Boolean);
//     // console.log('POST IMG LIST', postImagesList)

//     const randomIndex = Math.floor(Math.random() * postsArr.length);
//     // console.log('Rand Indx', randomIndex)
//     const selectedImage = postImagesList[randomIndex];
//     // console.log('SELECTED IMG', selectedImage)

//     return (
//         <>
//             <div className="landing-container">
//                 {/* Sidebar */}
//                 <div className="logoColumn">
//                     <div className="logoWrapper">
//                         <div className="logoImg">
//                         <img src="ReelQuotesLogo.gif" alt="Logo" />
//                         </div>
//                     </div>

//                     <div className="navButtons">

//                         <Link to="/" className="newSpotLink">
//                         <FaRegCompass /> Explore
//                         </Link>
//                         <Link to="/create" className="newSpotLink">
//                             Create a Post
//                         </Link>
//                     </div>
//                     </div>

//                 {/* Main Content */}
//                 <div className="main-content">
//                     <h1 className="browse-post-title">Browse Posts</h1>

//                 <div className="image-wrapper">
//                     <div className="mainImgSection">
//                     <div className="mainGridImg">
//                         <div className="mainImg-card">
//                         <img src={selectedImage} />
//                         </div>
//                     </div>
//                     </div>

//                     <div className="smallImgSection">
//                     <div className="grid">
//                         {postsArr
//                             .sort(() => 0.5 - Math.random()) // randomly shuffle
//                             .slice(0, 6)                     // take first 6 random images
//                             .map((post) =>
//                                 post ? <PostCard key={post.id} post={post} /> : null
//                         )}
//                     </div>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default LandingPage;


// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllPosts } from "../../redux/post";
import './LandingPage.css';
import { useEffect } from "react";
import { FaRegCompass } from "react-icons/fa";
//import Likebutton from "../LikeButton"; //added by tj
import PostCard from "../PostCard/PostCard"; //added by tj
import Layout from "../Layout/Layout";
import Sidebar from "../Sidebar/Sidebar";
import './LandingPage.css'; 

const LandingPage = () => {
    const dispatch = useDispatch();

    const postsList = useSelector((state) => state.posts);
    const loggedUser = useSelector((state) => state.session?.user);
    // console.log('Post List', postsList);
    const postsArr = Object.values(postsList);
    // console.log('All the posts', postsArr);

    useEffect(() => {
        dispatch(thunkGetAllPosts());
    }, [dispatch]);

// Random Image Selector Section
    const postImagesList = postsArr.map(post => post.post_img_url).filter(Boolean);
    // console.log('POST IMG LIST', postImagesList)

    const randomIndex = Math.floor(Math.random() * postsArr.length);
    // console.log('Rand Indx', randomIndex)
    const selectedImage = postImagesList[randomIndex];
    // console.log('SELECTED IMG', selectedImage)

    return (
        <>
            <div className="landing-container">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="main-content">
                    <h1 className="browse-post-title">Browse Posts</h1>

                <div className="image-wrapper">
                    <div className="mainImgSection">
                    <div className="mainGridImg">
                        <div className="mainImg-card">
                        <img src={selectedImage} />
                        </div>
                    </div>
                    </div>

                    <div className="smallImgSection">
                    <div className="grid">
                        {postsArr
                            .sort(() => 0.5 - Math.random()) // randomly shuffle
                            .slice(0, 6)                     // take first 6 random images
                            .map((post) =>
                                post ? <PostCard key={post.id} post={post} /> : null
                        )}
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;
