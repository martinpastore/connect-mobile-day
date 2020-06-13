import { combineReducers } from "redux";
import userReducer from "./user";
import quizReducer from "./quiz";

export default combineReducers({
  user: userReducer,
  quiz: quizReducer,
});
