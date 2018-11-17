import {
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

//Reflect initial state for the reducer
const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        //get current state
        ...state,
        profile: action.payload
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
