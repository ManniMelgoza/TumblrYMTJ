//polya:
//action types > action crreator > Thunks > reducers

//action types
const LOAD_LIKES = "likes/LOAD";
const ADD_LIKE = "likes/ADD";
const REMOVE_LIKE = "likes/REMOVE";


//action creators
const loadLikes = (likes) => ({ type: LOAD_LIKES, likes });
const addLike = (like) => ({ type: ADD_LIKE, like });
const removeLike = (likeId) => ({ type: REMOVE_LIKE, likeId });


//thunks
export const fetchLikes = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/likes`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadLikes(data.likes));
  }
};

export const createLike = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/likes`, {
    method: "POST",
  });
  if (res.ok) {
    const like = await res.json();
    dispatch(addLike(like));
  }
};

export const deleteLike = (postId, likeId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/likes/${likeId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeLike(likeId));
  }
};

//reducer
const initialState = {};

export default function likesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LIKES: {
      const newState = {};
      action.likes.forEach((like) => {
        newState[like.id] = like;
      });
      return newState;
    }
    case ADD_LIKE:
      return { ...state, [action.like.id]: action.like };
    case REMOVE_LIKE: {
      const newState = { ...state };
      delete newState[action.likeId];
      return newState;
    }
    default:
      return state;
  }
}