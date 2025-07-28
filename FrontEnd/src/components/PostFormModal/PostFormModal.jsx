// import { useState } from "react";
// // import { useDispatch } from "react-redux"
// // import { useModal } from "../../context/Modal"
// // TODO: Need to make sure the thunk naming here mathches the resux post file
// // import { thunkCreatePost } from "../../redux/post"
// import { useNavigate } from "react-router-dom";
// import "./PostFormModal.css";

// function PostFormModal() {
//     // const dispatch = useDispatch();
//     const navigate = useNavigate();



//     const [postTitle, setPostTitle] = useState("");
//     const [postBody, setpostBody] = useState("");
//     const [postImgUrl, setpostImgUrl] = useState("");

//     const [errors, setErrors] = useState({});
//     // const { closeModal } = useModal();

//      // Helper function to check image URL endings
//     function isValidImageURL(url) {
//         return (
//         url.endsWith('.jpg') ||
//         url.endsWith('.jpeg') ||
//         url.endsWith('.png') ||
//         url.endsWith('.JPG') ||
//         url.endsWith('.JPEG') ||
//         url.endsWith('.PNG')
//         );
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//     const newErrors = {};

//     if (!postTitle) newErrors.postTitle = 'Post Title is required';
//     if (!postBody) newErrors.postBody = 'Post Body is required';
//     if (!postImgUrl) {
//         newErrors.postImgUrl = 'Post Image URL is required';
//     } else if (!isValidImageURL(postImgUrl)) {
//         newErrors.previewImage = 'Preview image must end in .jpg, .jpeg, or .png';
//     }

//     if (Object.keys(newErrors).length > 0) {
//         return setErrors(newErrors);
//     }


//     // const postData = {
//     //     postTitle,
//     //     postBody,
//     //     postImgUrl
//     // }

//     try {
//         // const newPost = await dispatch(thunkCreatePost(postData))

//         navigate(`/`);
//     } catch (err) {
//         if (err.errors) setErrors(err.errors);
//         else console.error('Unexpected error:', err);
//     }
//     };

//     return (
//         <>
//             {errors.server && <p>{errors.server}</p>}
//             <form onSubmit={handleSubmit}>
//                 {/* TITLE POST */}
//                 <label>
//                     Title Post
//                     <input
//                     type="text"
//                     value={postTitle}
//                     onChange={(e) => setPostTitle (e.target.value)}
//                     />
//                 </label>
//                 {errors.postTitle && <p>{errors.postTitle}</p>}
//                 {/* POST BODY */}
//                 <label>
//                     Post Body
//                     <input
//                     type="text"
//                     value={postBody}
//                     onChange={(e) => setpostBody (e.target.value)}
//                     />
//                 </label>
//                 {errors.postBody && <p>{errors.postBody}</p>}
//                 <label>
//                     Post URL
//                     <input
//                     type="text"
//                     value={postTitle}
//                     onChange={(e) => setpostImgUrl (e.target.value)}
//                     />
//                 </label>
//                 {errors.postImgUrl && <p>{errors.postImgUrl}</p>}

//             </form>
//         </>
//     )
// }

// export default PostFormModal;


import { useState } from "react";
import { useDispatch} from "react-redux"
import { useModal } from "../../context/Modal"
import { thunkCreatePost } from "../../redux/post"
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRegCompass } from "react-icons/fa";

import "./PostFormModal.css";

function PostFormModal() {
    const dispatch = useDispatch();
    // const loggedUser = useSelector((state) => state.session?.user);
    // const navigate = useNavigate();
    const { closeModal } = useModal();

    const [postTitle, setPostTitle] = useState("");
    const [postBody, setpostBody] = useState("");
    const [postImgUrl, setpostImgUrl] = useState("");
    const [errors, setErrors] = useState({});

    // Helper function to check image URL endings
    function isValidImageURL(url) {
        return (
            url.endsWith('.jpg') ||
            url.endsWith('.jpeg') ||
            url.endsWith('.png') ||
            url.endsWith('.JPG') ||
            url.endsWith('.JPEG') ||
            url.endsWith('.PNG')
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!postTitle) newErrors.postTitle = 'Post Title is required';
        if (!postBody) newErrors.postBody = 'Post Body is required';
        if (!postImgUrl) {
            newErrors.postImgUrl = 'Post Image URL is required';
        } else if (!isValidImageURL(postImgUrl)) {
            newErrors.postImgUrl = 'Post image must end in .jpg, .jpeg, or .png';
        }

        if (Object.keys(newErrors).length > 0) {
            return setErrors(newErrors);
        }

        const postData = {
            postTitle,
            postBody,
            postImgUrl
        }

        try {
            const result = await dispatch(thunkCreatePost(postData));

            if (result.error) {
                setErrors(result.error);
            } else {
                closeModal(); // Close the modal on successful creation
                // navigate(`/`);
            }
        } catch (err) {
            if (err.errors) setErrors(err.errors);
            else console.error('Unexpected error:', err);
        }
    };

    return (
    <>
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
                </div>
            </div>
        <div className="modal-content">
            <h2>Create New Post</h2>
            {errors.server && <p className="error">{errors.server}</p>}

            <form onSubmit={handleSubmit}>
                {/* TITLE POST */}
                <label>
                    Title Post
                    <input
                        type="text"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="Enter post title"
                        />
                </label>
                {errors.postTitle && <p className="error">{errors.postTitle}</p>}

                {/* POST BODY */}
                <label>
                    Post Body
                    <textarea
                        value={postBody}
                        onChange={(e) => setpostBody(e.target.value)}
                        placeholder="What's on your mind?"
                        rows="4"
                        />
                </label>
                {errors.postBody && <p className="error">{errors.postBody}</p>}

                {/* POST IMAGE URL */}
                <label>
                    Post Image URL
                    <input
                        type="text"
                        value={postImgUrl}
                        onChange={(e) => setpostImgUrl(e.target.value)}
                        placeholder="Enter image URL"
                        />
                </label>
                {errors.postImgUrl && <p className="error">{errors.postImgUrl}</p>}

                <div className="modal-buttons">
                    <button type="submit" >Create Post</button>
                </div>
            </form>
        </div>
        </div>

        </>
    );
}

export default PostFormModal;
