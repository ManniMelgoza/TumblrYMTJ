import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
// Add redux reducers below
import sessionReducer from "./session";
import postsReducer from "./post";
import commentReducer from './comments';
import likesReducer from "./like";
import userReducer from "./user";
import followReducer from './follow';

const rootReducer = combineReducers({
  //add the reducers import names here
  session: sessionReducer,
  posts: postsReducer,
  comments: commentReducer,
  likes: likesReducer,
  follows: followReducer,
  user: userReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
