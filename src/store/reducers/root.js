import { combineReducers } from "redux";
import testReducer from "./test";
import searchReducer from "./search";
import authReducer from "./auth";
import sellReducer from "./sell";
import notificationsReducer from "./notifications";
import salesReducer from "./sales";
import shoppingReducer from "./shopping";
import commentsReducer from "./comments";

export default () =>
  combineReducers({
    //test: testReducer
    search: searchReducer,
    auth: authReducer,
    sell: sellReducer,
    notifications: notificationsReducer,
    sales: salesReducer,
    shopping: shoppingReducer,
    comments: commentsReducer
  });
