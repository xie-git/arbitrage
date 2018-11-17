import { GET_ERRORS } from "./types";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "../actions/types";
//Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Login Regular user - Get user token

export const LoginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save to localstorage
      const { token } = res.data;
      //set token to localstorage
      localStorage.setItem("jwtToken", token);
      //set token to Auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Login Facebook user - Get user token

export const FBLoginUser = userData => dispatch => {
  axios
    .post("/api/users/fblogin", userData)
    .then(res => {
      //save to localstorage
      const { token } = res.data;
      //set token to localstorage
      localStorage.setItem("jwtToken", token);
      //set token to Auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Login Google user - Get user token

export const GLoginUser = userData => dispatch => {
  axios
    .post("/api/users/glogin", userData)
    .then(res => {
      //save to localstorage
      const { token } = res.data;
      //set token to localstorage
      localStorage.setItem("jwtToken", token);
      //set token to Auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  //remove token from from localstorage
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to an empty object which will make isAuthenticated false
  dispatch(setCurrentUser({}));
};
