import { combineReducers } from "redux";
import testReducer from "./test";
import searchReducer from "./search";
import authReducer from "./auth";
import sellReducer from "./sell";
import messagingReducer from "./messaging";
import notificationsReducer from "./notifications";
import salesReducer from "./sales";

export default () =>
  combineReducers({
    //test: testReducer
    search: searchReducer,
    auth: authReducer,
    sell: sellReducer,
    messaging: messagingReducer,
    notifications: notificationsReducer,
    sales: salesReducer
  });
