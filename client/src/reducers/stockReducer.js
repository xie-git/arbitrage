import {
  GET_STOCKS,
  STOCK_LOADING,
  ADD_STOCKS,
  UPDATE_PRICE,
  STOCK_DELETE,
  GET_STOCK_BOT
} from "../actions/types";

//Reflect initial state for the reducer
const initialState = {
  stocks: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_STOCKS:
      return {
        //return anything in the state
        ...state,
        //get current and new stocks
        stocks: [action.payload, ...state.stocks]
      };
    case STOCK_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_STOCKS:
      return {
        ...state,
        stocks: action.payload,
        loading: false
      };
    case GET_STOCK_BOT:
      return {
        ...state,
        stocks: action.payload,
        loading: false
      };
    case STOCK_DELETE:
      return {
        ...state,
        stocks: state.stocks.filter(stock => stock._id !== action.payload)
      };
    case UPDATE_PRICE:
      const updatedStocks = state.stocks.map(
        stock => [action.payload].find(el => el._id === stock._id) || stock
      );
      return {
        ...state,
        stocks: updatedStocks
      };

    default:
      return state;
  }
}
