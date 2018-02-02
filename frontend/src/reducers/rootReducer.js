import {combineReducers} from "redux";
import {auth} from "./auth";
import {rules} from "./rules";

export const rootReducer = combineReducers({
  auth,
  rules
});
