import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  results: null, //search items results
  error: null, //errors
  loading: false, //is loading results
  searchQuery: null, //search query
  isActive: false //is search view showing
};

const searchStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
    searchQuery: action.payload.search_query
  });
};

const searchSuccess = (state, action) => {
  return updateObject(state, {
    results: action.payload.results,
    error: null,
    loading: false
  });
};

const searchFail = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false
  });
};

const searchSetActive = (state, action) => {
  return updateObject(state, {
    isActive: action.payload.isActive
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_START:
      return searchStart(state, action);

    case actionTypes.SEARCH_SUCCESS:
      return searchSuccess(state, action);

    case actionTypes.SEARCH_FAIL:
      return searchFail(state, action);

    case actionTypes.SEARCH_SET_ACTIVE:
      return searchSetActive(state, action);

    default:
      return state;
  }
};

export default reducer;