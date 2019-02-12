import { combineReducers } from "redux";
import testReducer from "./test";
import searchReducer from "./search";

export default () =>
  combineReducers({
    //test: testReducer
    search: searchReducer
  });
