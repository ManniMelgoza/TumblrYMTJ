import { csrfFetch } from "./csrf";
// *********************************
//   ACTIONS
// **********************************
const GET_ALL_POSTS = 'posts/getAllPosts';
const CREATE_POST = 'posts/createPost';
const GET_USER_POSTS = 'posts/getUserPosts'; 
// const EDIT_POST = 'posts/editPost';
// const DELETE_POST = 'posts/deletePost';

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

// const editPost = (editPost) => ({
//     type: EDIT_POST,
//     payload: editPost
// });

// const deletePost = (post_id) => ({
//     type: DELETE_POST,
//     payload: post_id
// });

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

export const thunkCreatePost = () => async (dispatch) => {

    try {
        const response = await fetch("api/posts/create");
            if (response.ok) {
                const createSpotData = await response.json();
                dispatch(createPost(createSpotData));
                return createSpotData;
            }
            else{
                const error = await response.json();
                return { error: error.errors || ["Not able to create post"] };
            }
        } catch (err) {
            console.error('Error creating post', err);
            return { "error": "Unable to create the post"}
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

// export const thunkEditPost = (post_id, postEdit) => async (dispatch) => {

//     try{
//         const response = await fetch(`api/posts/${post_id}}/edit`, {
//             method: "PUT",
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(postEdit)
//         });
//         if (response.ok) {
//             const editPostData = await response.json();
//             dispatch(editPost(editPostData))
//         } else {
//             const error = await response.json();
//             return { error: error.errors  || ["Unable to edit post"] };
//         }

//     } catch (err) {
//         console.error("Error editing post", err);
//         return { 'error': 'Unable to edit post' }
//     }
// };

// export const thinkDeletePost = (post_id) => async (dispatch) => {

//     try {
//         const response = await fetch (`api/posts/${post_id}`,{
//             method: 'DELETE'
//         });
//         if (response.ok) {
//             dispatch(deletePost(post_id))
//             return deletePost;
//         } else {
//             const error = await response.json();
//             return { error: error.errors || ['Unable to delete post'] }
//         }
//     } catch (err) {
//         console.error('Error deleting post', err);
//         return { 'error': 'mable to delete post' }
//     }
// };

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
        // case EDIT_POST:{
        //     return { ...state, [action.payload.id]: action.payload };
        // }
        // case DELETE_POST: {
        //     const newState = { ...state };
        //     delete newState[action.payload.id];
        //     return newState;
        // }
        default:
            return state;
    }
}

export default postsReducer;
