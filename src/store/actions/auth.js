import * as actionTypes from "./actionTypes";
import axios from "axios";
import { StackActions } from "react-navigation";
import NavigatorService from "../../navigator/NavigationService";
import { setItem, getItem, removeItem, multiGet } from "../utility";
import { msgConnect } from "./messaging";
import {
  ___LOGIN_ENDPOINT___,
  ___WHOAMI_ENDPOINT___,
  ___LOGOUT_ENDPOINT___,
  ___SIGNUP_ENDPOINT___,
  ___INITUSER_ENDPOINT___
} from "../constants";

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

export const loginSuccess = (token, isSaving) => {
  if (isSaving) setItem(tokenKey, token);
  axios.defaults.headers.common["Authorization"] = "Token " + token; // for all requests
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      token: token
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

export const authLogin = (
  username,
  password,
  callback,
  nextRoute = "Home",
  params
) => {
  return dispatch => {
    dispatch(authStart());
    if (isOffline) {
      //Offline
      if (username === "Test" && password === "testuserpwd") {
        const token = "tokenTest";
        dispatch(loginSuccess(token, true));
        callback ? callback() : null;
        NavigatorService.navigate(nextRoute, params);
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
          console.log(res);
          dispatch(loginSuccess(token, true));
          callback ? callback() : null;
          NavigatorService.navigate(nextRoute, params);
        })
        .catch(err => {
          dispatch(authFail(err));
        });
    }
  };
};

export const autoLogin = () => {
  return dispatch => {
    dispatch(authStart());
    dispatch(msgConnect(1));
    multiGet([tokenKey, officeKey]).then(userInfos => {
      console.log(userInfos);
      const token = userInfos[0][1];
      const office = userInfos[1][1];

      if (token !== null) {
        //Login
        //dispatch(loginSuccess(token, false));

        axios
          .get(___WHOAMI_ENDPOINT___, {
            headers: {
              Authorization: "Token " + token
            }
          })
          .then(res => {
            console.log("Succes", res);
            dispatch(loginSuccess(token, false));
          })
          .catch(err => {
            dispatch(authFail(err));
          });
        NavigatorService.navigate("Home");
      } else {
        dispatch(authFail("Token not found"));
        if (office !== null) {
          //Office Set but no login
          dispatch(authAppInit(office, false));
          NavigatorService.navigate("Home");
        } else {
          //No Login And no Office: First time start
          dispatch(authFail("Office not set"));
          NavigatorService.navigate("InitProfile");
        }
      }
    });
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authStart());

    axios
      .post(___LOGOUT_ENDPOINT___)
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch(err => {
        dispatch(authFail(err));
      });

    /*
    //test
    getItem(tokenKey)
      .then(token => {
        if (token === null) {
          dispatch(authFail("The user wasn't logged in"));
        } else {
          dispatch(logoutSuccess());
        }
      })
      .catch(err => {
        console.warn(err);
      });

    /*
    getItem(tokenKey)
      .then(token => {
        if (token === null) {
          dispatch(authFail("The user wasn't logged in"));
        } else {
          axios
            .post("http://127.0.0.1:8000/gnuma/v1/auth/logout/")
            .then(() => {
              dispatch(logoutSuccess());
            })
            .catch(err => {
              dispatch(authFail(err));
            });
        }
      })
      .catch(err => {
        console.warn(err);
      });
      */
  };
};

export const authCheckState = () => {
  return dispatch => {
    //const token = localStorage.getItem("token");
    if (token === null) {
      dispatch(logoutSuccess());
    } else {
      dispatch(loginSuccess(token));
    }
  };
};

export const authSignup = (
  username,
  email,
  password1,
  password2,
  callback,
  nextRoute = "Home",
  params
) => {
  return dispatch => {
    dispatch(authStart());

    if (isOffline) {
      console.log(username, email, password1, password2);
      /*
      const token = "tokenTest";
      dispatch(loginSuccess(token, true));
      NavigatorService.navigate("Home");
      */
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
              dispatch(loginSuccess(token, true));
              callback ? callback() : null;
              NavigatorService.navigate(nextRoute, params);
            })
            .catch(err => {
              dispatch(authFail(err));
            });
        })
        .catch(err => {
          dispatch(authFail(err));
        });
    }
  };
};
