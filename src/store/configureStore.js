import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createRootReducer from "./reducers/root";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(), // root reducer with router state
    preloadedState,
    composeEnhances(
      applyMiddleware(
        thunk // ... other middlewares ...
      )
    )
  );

  return store;
}
