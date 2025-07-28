import { csrfFetch } from "./csrf";
// *********************************
//   ACTIONS
// **********************************
const GET_ALL_POSTS = 'posts/getAllPosts';
const CREATE_POST = 'posts/createPost';
const GET_USER_POSTS = 'posts/getUserPosts';
const EDIT_POST = 'posts/editPost';
const DELETE_POST = 'posts/deletePost';
const GET_CURRENT_POST = 'posts/getCurrentPost'

// *********************************
//   ACTIONS CREATOR
// **********************************
const getAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    payload: posts
});

const createPost = (newPost) => ({
    type: CREATE_POST,
    payload: newPost
});

const getUserPosts = (posts) => ({
    type: GET_USER_POSTS,
    payload: posts
});

const editPost = (editPost) => ({
    type: EDIT_POST,
    payload: editPost
});

const deletePost = (post_id) => ({
    type: DELETE_POST,
    payload: post_id
});

const getCurrentPost = (post) => {
    return {
        type: GET_CURRENT_POST,
        payload: post
    };
};

// *********************************
//   THUNKS
// **********************************
export const thunkGetAllPosts = () =>  async (dispatch) => {

    try{
        // const response = await fetch("/api/posts", {
        const response = await csrfFetch("/api/posts");

        if (response.ok){
            const postsData = await response.json();
            dispatch(getAllPosts(postsData.Posts))
            return postsData;
        }
        else {
            // errors that come from the server
            const error = await response.json();
            return { error: error.errors || ['Not able to fetch all post data'] };
        }
        // In the catch parameter will be passsing an err obj
    } catch (err) {
        console.error('Error Retreiving ALL posts:', err);
        return {"error": "Unable to retrieve data"}
    }
};

export const thunkCreatePost = (postData) => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/posts/create", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            const newPostData = await response.json();
            dispatch(createPost(newPostData));
            return newPostData;
        } else {
            const error = await response.json();
            return { error: error.errors || ["Not able to create post"] };
        }
    } catch (err) {
        console.error('Error creating post', err);
        return { "error": "Unable to create the post" };
    }
};

export const thunkGetUserPosts = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/posts/current');

        if (response.ok) {
            const data = await response.json(); // { Posts: [our posts]}
            dispatch(getUserPosts(data.Posts));
            return data;
        } else {
            const error = await response.json();
            return { error: error.errors || ['Unable to fetch your posts'] };
        }
    } catch (err) {
        console.error("Error fetching current user's posts", err);
        return { error: "Something went wrong while fetching your posts" };
    }
};

export const thunkEditPost = (postId, postEdit) => async (dispatch) => {

    const response = await csrfFetch(`/api/posts/${postId}/edit`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postEdit)
    });

    if (response.ok) {
        const editPostData = await response.json();
        dispatch(editPost(editPostData));
        return editPostData;  // ADD: return the data for success handling
    } else {
        const error = await response.json();
        return { error: error.errors || ["Unable to edit post"] };
    }
}

export const thunkDeletePost = (post_id) => async (dispatch) => {
        // Fixed: Added leading slash and used csrfFetch for proper authentication
        const response = await csrfFetch(`/api/posts/${post_id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Fixed: Dispatch with post_id, not the action creator function
            dispatch(deletePost(post_id));
            return response;
        } else {
            const error = await response.json();
            return { error: error.errors || ['Post Not DELETED']}
        }
};


export const thunkCurrentPost = (postId) => async (dispatch) => {
    try {  // ADD try-catch
        const response = await csrfFetch(`/api/posts/${postId}`);
        if (response.ok){
            const updatePost = await response.json();
            dispatch(getCurrentPost(updatePost));
            return updatePost;
        } else {
            const error = await response.json();
            return { error: error.errors || ['No Data Retrieved of current post to be edited']}
        }
    } catch (err) {  // ADD catch block
        console.error("Error fetching current post", err);
        return { error: 'Unable to fetch post data' };
    }
}

// *********************************
//   REDUCERS
// **********************************
const initialState = {};

function postsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_POSTS: {
            const newState = {};
            action.payload.forEach((post) => (newState[post.id] = post)); // the purple parantheses may have to be curly braces
            return newState;
        }
        case CREATE_POST: {
            const newState = { ...state };
            newState[action.payload.id] = { ...action.payload }
            return newState;
        }
        case GET_USER_POSTS: {
            const newState = {};
            action.payload.forEach((post) => {
                newState[post.id] = post;
            });
            return newState;
        }
        case EDIT_POST:{
            return { ...state, [action.payload.id]: action.payload };
        }
        case DELETE_POST: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        case GET_CURRENT_POST: {
            return { ...state, currentPost: action.payload};
        }
        default:
            return state;
    }
}

export default postsReducer;
