// STEP 1: First we set our --------------- ACTION TYPES -------------------------

import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS'; 
const ADD_COMMENT = 'comments/ADD_COMMENT'; 
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'; 
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

// STEP 2: Then we will set our ------------- ACTION CREATORS -----------------------

const loadComments = (comments) => ({ type: LOAD_COMMENTS, comments });
const addComment = (comment) => ({ type: ADD_COMMENT, comment }); 
const updateComment = (comment) => ({ type: UPDATE_COMMENT, comment }); 
const deleteComment = (commentId) => ({ type: DELETE_COMMENT, commentId }); 

// STEP 3: Establishing our ----------------- THUNKS --------------------------------

export const getCommentsByPostId = (postId) => async (dispatch) => {

    try { 
    const res = await csrfFetch(`/api/posts/${postId}/comments`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadComments(data.comments));
    }
} catch (err) {
    console.error("Failed to load comments:", err)
}
}; 

export const createComment = (postId, payload) => async (dispatch) => {
    try {
    const res = await csrfFetch(`/api/posts/${postId}/comments`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }); 
    if (res.ok) {
        const data = await res.json(); 
        dispatch(addComment(data)); 
    }
} catch (err) {
    console.error("Failed to create comment:", err); 
}
}; 

export const editComment = (commentId, payload) => async (dispatch) => {
    try {
    const res = await csrfFetch(`/api/comments/${commentId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), 
    }); 
    if (res.ok) {
        const data = await res.json(); 
        dispatch(updateComment(data)); 
    }
} catch (err) {
    console.error("Failed to edit comment:", err); 
}
}; 

export const removeComment = (commentId) => async (dispatch) => {
    try{
    const res = await csrfFetch(`/api/comments/${commentId}/delete`, {
        method: 'DELETE', 
    }); 
    if (res.ok) {
        dispatch(deleteComment(commentId)); 
    }
} catch (err) {
    console.error("Failed to delete comment:", err); 
}
}; 

// STEP 4 : Set up your ----------------- REDUCERS ----------------------------------------------
const initialState = {}; // Setting up our default state for our comments slice

// next we create reducer function that will accept the state (currently defaulted as {} and an action (an object with type and payload)
export default function commentsReducer(state = initialState, action) {
    // use the spread operator to create a shallow copy of the current Redux state
    const newState = { ...state }; 
    // switch (action.type) will check the type of action being dispatched
    switch (action.type) {
        // if the action type is load_comments 
        case LOAD_COMMENTS:
            const all = {}; // we create an empty object 
            action.comments.forEach((comment) => (all[comment.id] = comment)) // storing them in a new object with id number as key 
            return all; // then return that object easier for retrieval 
            case ADD_COMMENT: // add a new id 
            case UPDATE_COMMENT: // replace an existing id 
                newState[action.comment.id] = action.comment; // both add comment and update comment do the same thing 
                return newState; 
            case DELETE_COMMENT:
                delete newState[action.commentId]; 
                return newState;
            default: 
            return state;
    }
}

