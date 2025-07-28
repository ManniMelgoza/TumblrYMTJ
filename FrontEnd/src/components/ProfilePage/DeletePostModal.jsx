import { useDispatch } from "react-redux";
import { thunkDeletePost } from "../../redux/post";
import { useModal } from "../../context/Modal";

function ManageDeleteSpotModal({ postId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
    e.preventDefault();

    return dispatch(thunkDeletePost(postId))
    .then(closeModal);
    };
    return (
        <>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this post from the listings?</p>
        <button
            onClick={handleDelete}
            style={{ color: "white", backgroundColor: "red" }}
        >
            Yes (Delete Post)
        </button>
        <button
            onClick={closeModal}
            style={{ color: "white", backgroundColor: "gray" }}
        >
            {" "}
            No (Keep Post)
        </button>
        </>
    );
}

export default ManageDeleteSpotModal;
