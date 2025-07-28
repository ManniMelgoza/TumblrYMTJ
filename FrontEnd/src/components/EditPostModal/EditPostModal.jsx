import { useState, useEffect} from "react";
import { useDispatch} from "react-redux"
import { useParams, useNavigate } from 'react-router-dom';
import { thunkCurrentPost, thunkEditPost } from '../../redux/post';
import { Link } from "react-router-dom";
import { FaRegCompass } from "react-icons/fa";
import { useSelector } from "react-redux"


import './EditPostModal.css';

function EditPostModal() {

    const [postTitle, setPostTitle] = useState("");
    const [postBody, setpostBody] = useState("");
    const [postImgUrl, setpostImgUrl] = useState("");
    const [errors, setErrors] = useState({});

    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const post = useSelector(state => state.posts.currentPost);

    useEffect(() => {
        if (postId) {
            dispatch(thunkCurrentPost(postId));
        }
    }, [dispatch, postId]);


    useEffect(() => {
        if (post) {
            setPostTitle(post.post_title || "");
            setpostBody(post.post_body || "");
            setpostImgUrl(post.post_img_url || "");
        }
    }, [post])

    const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (postTitle && postBody && postImgUrl) {
        try {
            const updatePost = await dispatch(
                thunkEditPost(postId, {
                    post_title: postTitle,
                    post_body: postBody,
                    post_img_url: postImgUrl
                })
            );

            if (updatePost && !updatePost.error) {
                navigate('/profile');
            } else if (updatePost && updatePost.error) {
                setErrors({ server: updatePost.error });
            }

        } catch (err) {
            console.error('Unexpected error:', err);
        }
    }
}
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
                    <button type="submit" >Update Post</button>
                </div>
            </form>
        </div>
        </div>

        </>
    );
}

export default EditPostModal;
