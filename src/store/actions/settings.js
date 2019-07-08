import * as actionTypes from "./actionTypes";
import NetInfo from "@react-native-community/netinfo";
import { ofType } from "redux-observable";
import { fromEvent } from "rxjs";
import { switchMap, map, filter } from "rxjs/operators";
import { authDelayedLogin } from "./auth";

export const settingsStart = () => dispatch => {
  dispatch({
    type: actionTypes.SETTINGS_START
  });
};

const settingsConnectionChange = isConnected => ({
  type: actionTypes.SETTINGS_CHANGE_CONNECTION,
  payload: {
    isConnected
  }
});

const settingsConnectionChangeEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.SETTINGS_START),
    switchMap(() =>
      fromEvent(NetInfo.isConnected, "connectionChange").pipe(
        map(isConnected => settingsConnectionChange(isConnected))
      )
    )
  );

const settingsLoginDelayedEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.SETTINGS_CHANGE_CONNECTION),
    filter(action => {
      console.log(action.payload.isConnected, state$.value.auth.delayedLogin);
      return action.payload.isConnected && state$.value.auth.delayedLogin;
    }),
    map(authDelayedLogin)
  );

export const settingsEpics = [
  settingsConnectionChangeEpic,
  settingsLoginDelayedEpic
];
