import axios from "axios";
import { GET_NEWS, NEWS_LOADING } from "./types";

export const getNews = () => dispatch => {
  axios
    .get(`/api/news/getNews`)
    .then(res =>
      dispatch({  
        type: GET_NEWS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NEWS,
        payload: {}
      })
    );
};

//Set loading state
export const setNewsLoading = () => {
  return {
    type: NEWS_LOADING
  };
};
