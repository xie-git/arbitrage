import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";
const initialState = {};

//The reducer is a function that retrieves the state and an action and then return a state.

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {};
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
