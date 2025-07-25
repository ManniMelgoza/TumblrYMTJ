// STEP 1: First we set our --------------- ACTION TYPES -------------------------

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS'; 
const ADD_COMMENT = 'comments/ADD_COMMENT'; 
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'; 
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

// STEP 2: Then we will set our ------------- ACTION CREATORS -----------------------

const loadComments = (comments) => ({ type: LOAD_COMMENTS, comments });
const addComment = (comment) => ({ type: ADD_COMMENT, comment }); 
const updateComment = (comment) => ({ type: UPDATE_COMMENT, comment }); 
const deleteComment = (comment) => ({ type: DELETE_COMMENT, comment }); 

// STEP 3: Establishing our ----------------- THUNKS --------------------------------

export const getCommentsByPostId = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/comments`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadComments(data.comments));
    }
}; 

export const createComment = (postId, payload) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`)
}