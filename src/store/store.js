import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createRootReducer from "./reducers/root";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  createRootReducer(), // root reducer with router state
  undefined,
  composeEnhances(
    applyMiddleware(
      thunk // ... other middlewares ...
    )
  )
);

export default store;
