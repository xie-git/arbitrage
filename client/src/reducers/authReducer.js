import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";

//The reducer is a function that retrieves the state and an action and then return a state.

//Reflect initial state for the reducer
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
