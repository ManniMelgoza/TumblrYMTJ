// redux/user.js

// Action Types
const SET_USER_PROFILE = "user/SET_USER_PROFILE";

// Action Creators
export const setUserProfile = (user) => ({
  type: SET_USER_PROFILE,
  user,
});

// Thunk: Fetch user by ID
export const thunkGetUserProfile = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);
  if (res.ok) {
    const user = await res.json();
    dispatch(setUserProfile(user));
    return user;
  } else {
    const err = await res.json();
    throw err;
  }
};

// Initial State
const initialState = {
  profile: {},
};

// Reducer
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.user,
      };
    default:
      return state;
  }
}
