import * as actionTypes from "./actionTypes";
import axios from "axios";
import { singleResults, multiResults } from "../../mockData/SearchResults";

const isOffline = true;

export const searchStart = search_query => {
  return {
    type: actionTypes.SEARCH_START,
    payload: {
      search_query: search_query
    }
  };
};

export const searchSuccess = results => {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    payload: {
      results: results
    }
  };
};

export const searchFail = error => {
  return {
    type: actionTypes.SEARCH_FAIL,
    payload: {
      error: error
    }
  };
};

export const searchSuggest = suggestions => {
  return {
    type: actionTypes.SEARCH_SUGGEST,
    payload: {
      suggestions
    }
  };
};

export const search = (search_query, cap) => {
  return dispatch => {
    dispatch(searchSetActive(false));
    dispatch(searchStart(search_query)); //Unificare

    if (isOffline) {
      if (search_query) {
        dispatch(
          searchSuccess(search_query.length > 3 ? singleResults : multiResults)
        );
      } else dispatch(searchSuccess(null));
    } else {
    }
    /* Query to search
    axios
    .post("http://127.0.0.1:8000/gnuma/v1/auth/login/", {
      search_query,
      cap
    })
    .then(res => {
      dispatch(searchSuccess(res));
    })
    .catch(err => {
      dispatch(searchFail(err));
    }); */
  };
};

export const searchSetActive = isActive => {
  return {
    type: actionTypes.SEARCH_SET_ACTIVE,
    payload: {
      isActive: isActive
    }
  };
};
