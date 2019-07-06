import * as actionTypes from "./actionTypes";
import axios from "axios";
import NavigatorService from "../../navigator/NavigationService";
import { setItem, removeItem, multiGet } from "../utility";
import {
  ___LOGIN_ENDPOINT___,
  ___WHOAMI_ENDPOINT___,
  ___LOGOUT_ENDPOINT___,
  ___SIGNUP_ENDPOINT___,
  ___INITUSER_ENDPOINT___
} from "../constants";
import { notificationsUnsubscribe } from "./notifications";
import WS from "../../utils/WebSocket";
import { AutoStart } from "../../utils/constants";
import CookieManager from "react-native-cookies";
import { commentsClear } from "./comments";
import { messagingClear } from "../actions/messaging";
import { chatClear } from "./chat";
import { mockWHOAMI } from "../../mockData/MockUser";
import NetInfo from "@react-native-community/netinfo";

const isOffline = false;

const tokenKey = "@auth:token";
const officeKey = "@auth:office";
const userDataKey = "@auth:userData";

export const authAppInit = (office, isSaving) => {
  if (isSaving) setItem(officeKey, office);
  return {
    type: actionTypes.AUTH_APPINIT,
    payload: {
      office
    }
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authCompleted = () => {
  return {
    type: actionTypes.AUTH_COMPLETED
  };
};

export const loginSuccess = (token, userData) => {
  setItem(tokenKey, token);
  setItem(userDataKey, userData);
  axios.defaults.headers.common["Authorization"] = "Token " + token; // for all requests
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      token,
      userData
    }
  };
};

export const logoutSuccess = () => {
  removeItem(tokenKey);
  removeItem(userDataKey);
  axios.defaults.headers.common["Authorization"] = undefined; // for all requests
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: {
      error: error
    }
  };
};

export const authSetPhone = phone => ({
  type: actionTypes.AUTH_SET_PHONE,
  payload: {
    phone
  }
});

//Action Creators

export const authLogin = (username, password) => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      dispatch(authStart());
      axios
        .post(___LOGIN_ENDPOINT___, {
          username,
          password
        })
        .then(res => {
          const token = res.data.key;
          login({ dispatch, token, resolve });
        })
        .catch(err => {
          console.log(err);
          dispatch(authFail(err));
          reject(err);
        });
    });
  };
};

export const autoLogin = () => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      //return reject(AutoStart.firstTime); //Testing
      if (getState().auth.token) return resolve(AutoStart.logged);
      dispatch(authStart());
      multiGet([tokenKey, officeKey, userDataKey])
        .then(async userInfos => {
          //console.log(userInfos);
          const token = userInfos[0][1];
          const office = userInfos[1][1];
          const userData = userInfos[2][1];

          if (token !== null) {
            if (await NetInfo.isConnected.fetch()) {
              login({ dispatch, resolve, token });
            } else {
              console.log("Offline login");
              if (userData) {
                dispatch(loginSuccess(token, userData));
                resolve(AutoStart.logged);
              } else {
                dispatch(authFail("No User data saved in async store"));
                reject(AutoStart.anonymous);
              }
            }
          } else {
            dispatch(authFail("Token not found"));
            if (office !== null) {
              //Office Set but no login
              dispatch(authAppInit(office, false));
              reject(AutoStart.anonymous);
            } else {
              //No Login And no Office: First time start
              dispatch(authFail("Office not set"));
              reject(AutoStart.firstTime);
            }
          }
        })
        .catch(err => {
          console.log("Error in storage: ", err);
          dispatch(authFail(err));
          reject(AutoStart.firstTime);
        });
    });
  };
};

export const authLogout = () => {
  return dispatch => {
    //dispatch(authStart());
    axios
      .post(___LOGOUT_ENDPOINT___)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        dispatch(authFail(err));
      });

    dispatch(commentsClear());
    dispatch(chatClear());
    messagingClear();
    WS.close();
    dispatch(logoutSuccess());
  };
};

export const authSignup = (username, email, password1, password2, phone) => {
  return (dispatch, getState) => {
    return new Promise(function(resolve, reject) {
      const office = getState().auth.office;
      dispatch(authStart());
      if (isOffline) {
        console.log(username, email, password1, password2);
      } else {
        axios
          .post(___SIGNUP_ENDPOINT___, {
            username: username,
            email: email,
            password1: password1,
            password2: password2,
            office: office,
            phone: phone
          })
          .then(res => {
            login({ dispatch, resolve, token: res.data.key });
          })
          .catch(err => {
            dispatch(authFail(err));
            reject(err);
          });
      }
    });
  };
};

export const authValidateAccount = () => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    const token = getState().auth.token;
    dispatch({ type: actionTypes.AUTH_VALIDATE_ACCOUNT });
    WS.init(token, resolve);
  });

const login = async ({ dispatch, resolve, token }) => {
  await CookieManager.clearAll();

  console.log("Logging in...", token);
  if (!token) {
    console.log("ERROR NOT SET IN LOGIN");
    throw "Error not set in login";
  }

  let userData;
  /*
  try {
    userData = await axios.get(___WHOAMI_ENDPOINT___, {
      headers: {
        Authorization: "Token " + token
      }
    }).data;
  } catch (error) {
    console.log("Error -> ", error);
    dispatch(authFail(error));
    reject(error);
  }
  */
  userData = mockWHOAMI; //TEST

  dispatch(loginSuccess(token, userData));
  console.log(userData.isActive);
  if (userData.isActive) {
    WS.init(token, resolve);
  } else {
    resolve({ token, isActive: false });
    dispatch(authCompleted());
  }
};
