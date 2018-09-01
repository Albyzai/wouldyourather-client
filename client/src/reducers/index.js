import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import dilemmaReducer from "./dilemmaReducer";
// import dilemmaReducer from "./dilemmaReducer";

export default combineReducers({
  auth: authReducer,
  dilemmas: dilemmaReducer,
  errors: errorReducer
});
