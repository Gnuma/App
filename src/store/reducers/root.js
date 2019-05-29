import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import searchReducer from "./search";
import authReducer from "./auth";
import sellReducer from "./sell";
import notificationsReducer from "./notifications";
import salesReducer from "./sales";
import shoppingReducer from "./shopping";
import commentsReducer from "./comments";
import chatReducer from "./chat";

export const rootReducer = combineReducers({
  search: searchReducer,
  auth: authReducer,
  sell: sellReducer,
  notifications: notificationsReducer,
  sales: salesReducer,
  shopping: shoppingReducer,
  comments: commentsReducer,
  chat: chatReducer
});

import { searchEpics } from "../actions/search";
import { chatEpics } from "../actions/chat";

export const rootEpic = combineEpics(...searchEpics, ...chatEpics);
