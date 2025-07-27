// bringing in our React Hooks and Redux tools
import { useEffect, useState } from 'react'; // useState to help keep track of input fields and useEffect to fetch comments when components loads
import { useDispatch, useSelector } from 'react-redux'; // useDispatch lets us invoke our thunks and useSelector lets us pull data from the store
import { getCommentsByPostId, createComment, editComment, removeComment } from '../../redux/comments'; // Our CRUD operations from thunks

function Comments({ postId }) { // creating a function that will take in a postId prop so it knows which post's comments to show 
    // setting up some initial variables to generate actions to our store and for fetching data
    const dispatch = useDispatch(); 
    const comments = useSelector(state => Object.values(state.commets)); 
    const [newComment, setNewComment] = useState(''); 
    const [editId, setEditId] = useState(null); 
    const [editBody, setEditBody] = useState(''); 

    useEffect(() => {
        if (postId) dispatch(getCommentsByPostId(postId)); 
    }, [dispatch, postId]); 

}