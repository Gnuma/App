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

const isOffline = false;

const tokenKey = "@auth:token";
const officeKey = "@auth:office";

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

export const loginSuccess = (
  token,
  username = "NotSet",
  gnumaUser = "NotSet",
  id = "NotSet"
) => {
  setItem(tokenKey, token);
  axios.defaults.headers.common["Authorization"] = "Token " + token; // for all requests
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      token,
      username,
      gnumaUser,
      id
    }
  };
};

export const logoutSuccess = () => {
  removeItem(tokenKey);
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

export const authLogin = (username, password, resolve) => {
  return dispatch => {
    dispatch(authStart());
    if (isOffline) {
      //Offline
      if (username === "Test" && password === "testuserpwd") {
        const token = "tokenTest";
        dispatch(loginSuccess(token));
        resolve ? resolve(token) : null;
        NavigatorService.goBack(null);
      } else {
        dispatch(authFail("Invalid authentication"));
      }
    } else {
      //Online
      axios
        .post(___LOGIN_ENDPOINT___, {
          username,
          password
        })
        .then(res => {
          const token = res.data.key;
          login({ dispatch, resolve, token });
          NavigatorService.navigate("App");
        })
        .catch(err => {
          console.log(err);
          dispatch(authFail(err));
        });
    }
  };
};

export const autoLogin = (resolve, reject) => {
  return dispatch => {
    dispatch(authStart());
    multiGet([tokenKey, officeKey])
      .then(userInfos => {
        //console.log(userInfos);
        const token = userInfos[0][1];
        const office = userInfos[1][1];

        if (token !== null) {
          axios
            .get(___WHOAMI_ENDPOINT___, {
              headers: {
                Authorization: "Token " + token
              }
            })
            .then(res => {
              if (!res.data.gnuma_user) throw "Gnuma User not initialized";
              login({ dispatch, token, resolve, data: res.data });
            })
            .catch(err => {
              console.log("Error -> ", err);
              dispatch(authFail(err));
              reject(AutoStart.anonymous);
            });
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
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(___LOGOUT_ENDPOINT___)
      .then(() => {
        dispatch(notificationsUnsubscribe());
        WS.close();
        dispatch(logoutSuccess());
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2, resolve) => {
  return dispatch => {
    dispatch(authStart());
    console.log("INIZIO");
    if (isOffline) {
      console.log(username, email, password1, password2);
    } else {
      axios
        .post(___SIGNUP_ENDPOINT___, {
          username: username,
          email: email,
          password1: password1,
          password2: password2
        })
        .then(res => {
          const token = res.data.key;
          axios
            .post(___INITUSER_ENDPOINT___, {
              key: token,
              classM: "5B",
              office: "J. Von Neumann"
            })
            .then(res => {
              login({ dispatch, resolve, token });
              NavigatorService.goBack(null);
            })
            .catch(err => {
              dispatch(authFail(err));
              console.log("DENTRO");
            });
        })
        .catch(err => {
          dispatch(authFail(err));
          console.log("FUORI");
        });
    }
  };
};

const login = ({ dispatch, resolve, token, data }) => {
  console.log("Logging in...", token);
  if (!token) {
    console.log("ERROR NOT SET IN LOGIN");
    throw "Error not set in login";
  }

  if (data) {
    dispatch(loginSuccess(token, data.username, data.gnuma_user, data.pk));
  } else {
    dispatch(loginSuccess(token));
  }

  WS.init(token, resolve);
};
