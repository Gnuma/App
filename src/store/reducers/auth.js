import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    token: action.payload.token,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false
  });
};

const logoutSuccess = (state, action) => {
  return updateObject(state, {
    token: null,
    error: null,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.LOGOUT_SUCCESS:
      return logoutSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
