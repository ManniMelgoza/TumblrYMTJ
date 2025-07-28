// bringing in our React Hooks and Redux tools
import { useEffect, useState } from 'react'; // useState to help keep track of input fields and useEffect to fetch comments when components loads
import { useDispatch, useSelector } from 'react-redux'; // useDispatch lets us invoke our thunks and useSelector lets us pull data from the store
import { getCommentsByPostId, createComment, editComment, removeComment } from '../../redux/comments'; // Our CRUD operations from thunks
// going to add my authpromptmodal
import { useModal } from "../../context/Modal";
import AuthPromptModal from '../AuthPromptModal/AuthPromptModal';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Comments.css';
import ConfirmDeleteModal from './ConfirmDeleteModal';


function Comments({ postId, openLoginModal, openSignupModal }) { // creating a function that will take in a postId prop so it knows which post's comments to show 
    // setting up some initial variables to generate actions to our store and for fetching data
    const dispatch = useDispatch(); 
    // const comments = useSelector(state => Object.values(state.comments)); 
    // const currentUser = useSelector(state => state.session.user); 
    const commentsList = useSelector((state) => state.comments); 
    const commentsArr = Object.values(commentsList); 
    // console.log('commentsArr:', commentsArr);
    const sessionUser = useSelector(state => state.session.user); 
    // console.log('sessionUser:', sessionUser); // logs current logged-in user info


    const [newComment, setNewComment] = useState(''); 
    const [editId, setEditId] = useState(null); 
    const [editBody, setEditBody] = useState(''); 
    const { setModalContent, openModal, closeModal } = useModal(); 
    const [showAuthPrompt, setShowAuthPrompt] = useState(false); 
    

    useEffect(() => {
        if (postId) dispatch(getCommentsByPostId(postId)); 
    }, [dispatch, postId]); // when the component mounts or when postId changes, it will get all the comments for that post

    const handleCreate = (e) => { 
        e.preventDefault(); 
        if (!newComment.trim()) {
            // console.log('Attempted to create comment with empty body');

            return; // easier to look for white space
        }

        if (!sessionUser) { // if there is no sessionUser
            // console.log('User not logged in, showing auth prompt');

            setModalContent(
                <AuthPromptModal
                onClose={() => setModalContent(null)}
                openLogin={() => setModalContent(<LoginFormModal />)}
                openSignup={() => setModalContent(<SignupFormModal />)}
                />
            );
            return;
        }
        // console.log('Dispatching createComment:', newComment);
        dispatch(createComment(postId, { comment_body: newComment })); 
        setNewComment(''); 
    }; 

    const startEditing = (comment) => {
        // console.log('Starting edit for comment:', comment);

        setEditId(comment.id); 
        setEditBody(comment.comment_body); // calss when the user clicks "Edit" - it enables the edit form 
    }; 

    const handleEdit = (e) => {
        e.preventDefault(); 
        if (!editBody.trim()) {
            // console.log('Attempted to submit empty edit');

            return; 
        }
        // console.log('Dispatching editComment:', editId, editBody);

        dispatch(editComment(editId, { comment_body: editBody }));
        setEditId(null); 
        setEditBody('');
    };  // this should submit the edited comment and calls redux to update the backend then resets the edit state


    const handleDeleteClick = (comment) => {
        setModalContent(
            <ConfirmDeleteModal commentId={comment.id} />);
 
    };

    // sort comments from oldest to newest via create_at date
    const sortedComments = commentsArr.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); 

    return (
        <div className="comments-section">
    
            <div className="comments-list">
                {commentsArr?.map(comment => (
                    <div key={comment.id} className="comment">
                        {editId === comment.id ? (
                            <form onSubmit={handleEdit}>
                                <textarea
                                    value={editBody}
                                    onChange={(e) => setEditBody(e.target.value)}
                                />
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <p>{comment.comment_body}</p>
                                <hr></hr>
                                <p>
                                    <span className='comment-username'>{comment.username}</span>
                                    <br></br>
                                    <span className='comment-date'>{new Date(comment.created_at).toLocaleDateString()}</span>
                                </p>
                                {sessionUser && Number(sessionUser.id) === Number(comment.user_id) && (
                                <>
                                <button onClick={() => startEditing(comment)}>Edit</button>
                                <button onClick={() => handleDeleteClick(comment)}>Delete</button>
                                </>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
                             
            {/* putting the post comment at the end */}

            <form onSubmit={handleCreate} className="comment-form">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button type="submit">Post Comment</button>
            </form>

        </div>
    );

}

export default Comments

