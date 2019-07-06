import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import update from "immutability-helper";

const initialState = {
  token: null,
  office: null,
  userData: null,
  isActive: false,

  error: null,
  loading: false
};

export const authAppInit = (state, action) => {
  return updateObject(state, {
    office: action.payload.office
  });
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const loginSuccess = (
  state,
  {
    payload: {
      token,
      userData: { office, isActive, ...restUserData }
    }
  }
) => {
  return updateObject(state, {
    token,
    userData: restUserData,
    office,
    isActive,
    error: null
  });
};

const authCompleted = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.payload.error,
    loading: false
  });
};

const authSetPhone = (state, { payload: { phone } }) =>
  update(state, {
    userData: {
      phone: { $set: phone }
    },
    isActive: { $set: false }
  });

const logoutSuccess = (state, action) => initialState;

const authValidateAccount = (state, action) =>
  update(state, {
    isActive: { $set: true }
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_APPINIT:
      return authAppInit(state, action);

    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_COMPLETED:
      return authCompleted(state, action);

    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.LOGOUT_SUCCESS:
      return logoutSuccess(state, action);

    case actionTypes.AUTH_SET_PHONE:
      return authSetPhone(state, action);

    case actionTypes.AUTH_VALIDATE_ACCOUNT:
      return authValidateAccount(state, action);

    default:
      return state;
  }
};

export default reducer;
