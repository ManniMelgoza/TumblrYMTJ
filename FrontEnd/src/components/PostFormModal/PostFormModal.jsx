import { useState } from "react";
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
// TODO: Need to make sure the thunk naming here mathches the resux post file
import { thunkGetAllPosts } from "../../redux/post"


function PostFormModal() {
    const dispatch = useDispatch();
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkGetAllPosts({
                // TODO PHIL : when we do our naaming converntion in the front end for the values that we are getting from the back and do they need to be the same stype diff from what we are currently working on
                postTitle,
                postBody
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        }
        else {
            closeModal();
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

            </form>
        </>
    )
}


export default PostFormModal;
