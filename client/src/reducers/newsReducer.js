import { GET_NEWS, NEWS_LOADING } from "../actions/types";

const initialState = {
  newsData: [],
  newsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        newsData: action.payload,
        newsLoading: false
      };
    case NEWS_LOADING:
      return {
        newsLoading: true
      };
    default:
      return state;
  }
}
