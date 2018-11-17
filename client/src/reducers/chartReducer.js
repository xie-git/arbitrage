import {
  GET_INTRADAY,
  GET_DAILY,
  GET_WEEKLY,
  GET_MONTHLY,
  GET_YEARLY,
  GET_SMA,
  GET_MACD,
  GET_SO,
  GET_AD
} from "../actions/types";

const initialState = {
  stockData: [],
  TIData: [],
  ticker: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DAILY:
      return {
        ...state,
        stockData: action.payload,
        ticker: action.ticker
      };
    case GET_INTRADAY:
      return {
        ...state,
        stockData: action.payload,
        ticker: action.ticker
      };
    case GET_WEEKLY:
      return {
        ...state,
        stockData: action.payload,
        ticker: action.ticker
      };
    case GET_MONTHLY:
      return {
        ...state,
        stockData: action.payload,
        ticker: action.ticker
      };
    case GET_SMA:
      return {
        ...state,
        stockData: [action.payload, ...state.stockData]
      };
    case GET_MACD:
      return {
        ...state,
        TIData: action.payload
      };
    case GET_SO:
      return {
        ...state,
        TIData: action.payload
      };
    case GET_AD:
      return {
        ...state,
        TIData: action.payload
      };
    default:
      return state;
  }
}
