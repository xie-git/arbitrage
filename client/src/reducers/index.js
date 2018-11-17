import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import stockReducer from "./stockReducer";
import newsReducer from "./newsReducer";
import chartReducer from "./chartReducer";

//PUT ALL REDUCERS HERE
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  stocks: stockReducer,
  news: newsReducer,
  chart: chartReducer
});
