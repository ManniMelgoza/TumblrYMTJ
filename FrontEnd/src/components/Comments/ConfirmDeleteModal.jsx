import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeComment } from "../../redux/comments";

function ConfirmDeleteModal({ commentId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
    e.preventDefault();

    dispatch(removeComment(commentId))
    .then(closeModal);
    };
    return (
        <>
        <div className="modal-backdrop">
        <div className="modal-content">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this comment?</p>
        <div className="modal-buttons">
        <button
            onClick={handleDelete}
            style={{ color: "white", backgroundColor: "red" }}
            className="confirm"
        >
            Delete Comment
        </button>
        <button
            onClick={closeModal}
            className="cancel"
        >
            {" "}
            Cancel
        </button>
        </div>
        </div>
        </div>
        </>
    );
}

export default ConfirmDeleteModal;


 
