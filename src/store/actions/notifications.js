import * as actionTypes from "./actionTypes";
import axios from "axios";
import { newCommentsSingle, newCommentsMulti } from "../../mockData/comments";

export const notificationsUpdate = notifications => {
  return {
    type: actionTypes.NOTIFICATIONS_UPDATE,
    payload: {
      notifications
    }
  };
};

export const notificationsSetSubscription = idSubscription => {
  return {
    type: actionTypes.NOTIFICATIONS_SUBSCRIBE,
    payload: {
      idSubscription
    }
  };
};

export const notificationsSubscribe = () => {
  return dispatch => {
    console.log("Getting Called");
    const idSubscription = setInterval(() => dispatch(update()), 5000);
    dispatch(notificationsSetSubscription(idSubscription));
  };
};

export const notificationsUnsubscribe = () => {
  return {
    type: actionTypes.NOTIFICATIONS_UNSUBSCRIBE
  };
};

let debugCounter = 0;

export const update = () => {
  return dispatch => {
    //axios

    if (debugCounter === 0) dispatch(notificationsUpdate(newCommentsMulti));
    else dispatch(notificationsUpdate(newCommentsSingle));
    debugCounter++;
  };
};
