import { useState } from "react";
// import { useDispatch } from "react-redux"
// import { useModal } from "../../context/Modal"
// TODO: Need to make sure the thunk naming here mathches the resux post file
// import { thunkCreatePost } from "../../redux/post"
import { useNavigate } from "react-router-dom";
import "./PostFormModal.css";

function PostFormModal() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();



    const [postTitle, setPostTitle] = useState("");
    const [postBody, setpostBody] = useState("");
    const [postImgUrl, setpostImgUrl] = useState("");

    const [errors, setErrors] = useState({});
    // const { closeModal } = useModal();

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
        newErrors.previewImage = 'Preview image must end in .jpg, .jpeg, or .png';
    }

    if (Object.keys(newErrors).length > 0) {
        return setErrors(newErrors);
    }


    // const postData = {
    //     postTitle,
    //     postBody,
    //     postImgUrl
    // }

    try {
        // const newPost = await dispatch(thunkCreatePost(postData))

        navigate(`/`);
    } catch (err) {
        if (err.errors) setErrors(err.errors);
        else console.error('Unexpected error:', err);
    }
    };

    return (
        <>
            {errors.server && <p>{errors.server}</p>}
            <form onSubmit={handleSubmit}>
                {/* TITLE POST */}
                <label>
                    Title Post
                    <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle (e.target.value)}
                    />
                </label>
                {errors.postTitle && <p>{errors.postTitle}</p>}
                {/* POST BODY */}
                <label>
                    Post Body
                    <input
                    type="text"
                    value={postBody}
                    onChange={(e) => setpostBody (e.target.value)}
                    />
                </label>
                {errors.postBody && <p>{errors.postBody}</p>}
                <label>
                    Post URL
                    <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setpostImgUrl (e.target.value)}
                    />
                </label>
                {errors.postImgUrl && <p>{errors.postImgUrl}</p>}

            </form>
        </>
    )
}

export default PostFormModal;
