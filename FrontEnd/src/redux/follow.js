const LOAD_FOLLOWERS = 'follows/LOAD_FOLLOWERS';
const LOAD_FOLLOWING = 'follows/LOAD_FOLLOWING';
const ADD_FOLLOW = 'follows/ADD_FOLLOWER';
const REMOVE_FOLLOW = 'follows/REMOVE_FOLLOWER';

// Action Creators
export const loadFollowers = (followers) => ({
    type: LOAD_FOLLOWERS,
    followers
});

export const loadFollowing = (following) => ({
    type: LOAD_FOLLOWING,
    following
});

export const addFollow = (follow) => ({
    type: ADD_FOLLOW,
    follow
}); 

export const removeFollow = (follow) => ({
    type: REMOVE_FOLLOW, 
    follow
}); 


// Thunk Actions
export const getFollowers = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${userId}/followers`);
    if (response.ok) {
        const followers = await response.json();
        dispatch(loadFollowers(followers));
    }
}

export const getFollowing = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${userId}/following`);
    if (response.ok) {
        const following = await response.json();
        dispatch(loadFollowing(following));
    }
}

export const followUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${userId}/following`, { // did not match backend route added /following ater userId
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const follow = await response.json();
        dispatch(addFollow(follow));
    }
}

export const unfollowUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${userId}/following/unfollow`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }); 
    if (response.ok) {
        const follow = await response.json();
        dispatch(removeFollow(follow)); 
    }
}

// Reducers
const initialState = {
    followers: {},
    following: {}
};

const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_FOLLOWERS:
            return {
                ...state,
                followers: action.followers
            };
        case LOAD_FOLLOWING:
            return {
                ...state,
                following: action.following
            };
        case ADD_FOLLOW:
            return {
                ...state,
                following: {
                    ...state.following,
                    [action.follow.id]: action.follow
                }
            };
        case REMOVE_FOLLOW: {
            const newFollowing = { ...state.following };
            delete newFollowing[action.follow.id];
            return {
                ...state,
                following: newFollowing

            };
            }
        default:
            return state;
    }

}

export default followReducer;