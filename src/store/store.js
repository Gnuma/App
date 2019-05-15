import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import createRootReducer from "./reducers/root";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  createRootReducer(),
  undefined,
  composeEnhances(applyMiddleware(thunk, promise))
);

export default store;
