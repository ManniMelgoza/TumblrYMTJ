//polya:
//action types > action crreator > Thunks > reducers

//action types
const LOAD_LIKES = "likes/LOAD";
const ADD_LIKE = "likes/ADD";
const REMOVE_LIKE = "likes/REMOVE";


//action creators
const loadLikes = (payload) => ({ type: LOAD_LIKES, ...payload });

//thunks
export const fetchLikes = (postId) => async (dispatch) => {
  const res = await fetch(`/api/likes/${postId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadLikes({ postId, likes: data.likes || data }));
  }
};

export const createLike = (postId) => async (dispatch) => {
  const response = await fetch(`/api/likes/${postId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    dispatch(fetchLikes(postId)); 
  }
};

export const deleteLike = (postId) => async (dispatch) => {
  const res = await fetch(`/api/likes/${postId}`, {
  method: "DELETE",
});
  if (res.ok) {
    dispatch(fetchLikes(postId));
  }
};

//reducer
const initialState = {byPostId: {}};

export default function likesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LIKES: {
      const { postId, likes } = action;
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          [postId]: likes.reduce((acc, like) => {
            acc[like.id] = like;
            return acc;
          }, {})
        }
      };
    }
    case ADD_LIKE: {
      const { post_id, id } = action.like;
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          [post_id]: {
            ...(state.byPostId[post_id] || {}),
            [id]: action.like
          }
        }
      };
    }
    case REMOVE_LIKE: {
      const { postId, likeId } = action;
      const postLikes = { ...(state.byPostId[postId] || {}) };
      delete postLikes[likeId];
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          [postId]: postLikes
        }
      };
    }
    default:
      return state;
  }
}

//selectors
export const selectLikesForPost = (postId) => (state) => {
  return state.likes.byPostId[postId] 
    ? Object.values(state.likes.byPostId[postId])
    : [];
};

export const selectLikeCountForPost = (postId) => (state) => {
  return state.likes.byPostId[postId]
    ? Object.keys(state.likes.byPostId[postId]).length
    : 0;
};

export const selectUserLikeForPost = (postId, userId) => (state) => {
  if (!userId || !state.likes.byPostId[postId]) return null;
  return Object.values(state.likes.byPostId[postId]).find(
    like => like.user_id === userId
  ) || null;
};

