import { combineReducers } from "redux";
import testReducer from "./test";
import searchReducer from "./search";
import authReducer from "./auth";

export default () =>
  combineReducers({
    //test: testReducer
    search: searchReducer,
    auth: authReducer
  });
