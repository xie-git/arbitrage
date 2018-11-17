import { ADD_POST, GET_POSTS, POST_LOADING, GET_POST } from "../actions/types";
const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  //return default state
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        //current state
        ...state,
        //and all posts
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        //return anything in the state
        ...state,
        //get current posts and new post
        posts: [action.payload, ...state.posts]
      };
    default:
      return state;
  }
}
