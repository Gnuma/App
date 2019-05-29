import * as actionTypes from "./actionTypes";
import axios from "axios";
import { ofType } from "redux-observable";
import { map, mergeMap, catchError, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";

import { singleResults, multiResults } from "../../mockData/SearchResults";
import { Keyboard } from "react-native";
import {
  ___BOOK_HINTS_ENDPOINT___,
  ___AD_SEARCH_ENDPOINT___
} from "../constants";
import { isIsbn } from "../utility";

const isOffline = false;

export const searchSetSearchQuery = search_query => {
  return {
    type: actionTypes.SEARCH_SET_SEARCHQUERY,
    payload: {
      search_query: search_query
    }
  };
};

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

export const searchSetActive = isActive => {
  return {
    type: actionTypes.SEARCH_SET_ACTIVE,
    payload: {
      isActive: isActive
    }
  };
};

export const searchGoHome = () => {
  return {
    type: actionTypes.SEARCH_GO_HOME
  };
};

export const search = (search_query, cap) => {
  return dispatch => {
    Keyboard.dismiss();
    if (isOffline) {
      dispatch(searchStart(search_query)); //Unificare
      if (search_query) {
        dispatch(
          searchSuccess(search_query.length > 3 ? singleResults : multiResults)
        );
      } else dispatch(searchSuccess(null));
    } else {
      let keyName;
      let value;
      if (search_query.isbn) {
        keyName = "isbn";
        value = search_query.isbn;
        dispatch(searchStart(search_query.title));
      } else {
        keyName = "keyword";
        value = search_query;
        dispatch(searchStart(search_query));
      }
      axios
        .post(___AD_SEARCH_ENDPOINT___, {
          [keyName]: value
        })
        .then(res => {
          console.log(res);
          dispatch(searchSuccess(res.data));
        })
        .catch(err => {
          dispatch(searchFail(err));
        });
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

/*
export const handleSearchQueryChange = search_query => {
  return dispatch => {
    dispatch(searchSetSearchQuery(search_query));
    axios
      .post(___BOOK_HINTS_ENDPOINT___, {
        keyword: search_query
      })
      .then(res => {
        dispatch(searchSuggest(res.data.results));
      })
      .catch(err => {
        dispatch(searchFail(err));
      });
  };
};
*/

//Epics
const searchChangeEpic = action$ =>
  action$.pipe(
    ofType(actionTypes.SEARCH_SET_SEARCHQUERY),
    switchMap(action =>
      ajax
        .post(___BOOK_HINTS_ENDPOINT___, {
          keyword: action.payload.search_query
        })
        .pipe(
          map(response => {
            console.log(response);
            searchSuggest(response.data.results);
          }),
          catchError(error => of(searchFail(error)))
        )
    )
  );

export const searchEpics = [searchChangeEpic];
