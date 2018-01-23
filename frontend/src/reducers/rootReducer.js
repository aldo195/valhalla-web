import {combineReducers} from "redux";
import {auth} from "./auth";
import {organizations} from "./organizations";

export const rootReducer = combineReducers({
  auth,
  organizations
});
