import axios from "axios";
import {
  ADD_STOCKS,
  GET_STOCKS,
  STOCK_LOADING,
  UPDATE_PRICE,
  STOCK_DELETE,
  GET_STOCK_BOT
  //   GET_ERRORS,
  //   CLEAR_ERRORS
} from "./types";

//Add Stocks

export const addStocks = (symbol, price, change) => dispatch => {
  axios
    .post(`/api/personalStocks/AddStock/${symbol}/${price}/${change}`)
    .then(res =>
      dispatch({
        type: ADD_STOCKS,
        payload: res.data
      })
    );
};

//Get Stocks
export const getStocks = user => dispatch => {
  axios
    .get(`/api/personalStocks/findbyUser/${user}`)
    .then(res =>
      dispatch({
        type: GET_STOCKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STOCKS,
        payload: {}
      })
    );
};

//Get Stocks for the bot
export const getStocksForBot = user => dispatch => {
  console.log(user);
  axios
    .post(`/api/stockBot/getStocksForBot/${user}`)
    .then(res =>
      dispatch({
        type: GET_STOCK_BOT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STOCK_BOT,
        payload: {}
      })
    );
};

export const updatePrice = (id, price, change) => dispatch => {
  axios
    .put(`/api/personalStocks/updatePrice/${id}/${price}/${change}`)
    .then(res =>
      dispatch({
        type: UPDATE_PRICE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: UPDATE_PRICE,
        payload: {}
      })
    );
};

export const deleteStock = id => dispatch => {
  axios
    .delete(`/api/personalStocks/deleteStock/${id}`)
    .then(res => dispatch({ type: STOCK_DELETE, payload: id }));
};

//Set loading state
export const setStockLoading = () => {
  return {
    type: STOCK_LOADING
  };
};
