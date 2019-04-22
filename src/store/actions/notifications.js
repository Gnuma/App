import * as actionTypes from "./actionTypes";
import axios from "axios";
import { newCommentsSingle, newCommentsMulti } from "../../mockData/comments";
import { localNotification } from "../../service/pushNotification";
import { ___CREATE_COMMENT___ } from "../constants";

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
    //const idSubscription = setInterval(() => dispatch(update()), 10000);
    //dispatch(notificationsSetSubscription(idSubscription));
  };
};

export const notificationsUnsubscribe = () => {
  return {
    type: actionTypes.NOTIFICATIONS_UNSUBSCRIBE
  };
};

export const notificationsViewItem = itemPK => {
  return {
    type: actionTypes.NOTIFICATIONS_VIEW_ITEM,
    payload: {
      itemPK
    }
  };
};

let debugCounter = 0;

export const update = () => {
  return dispatch => {
    //axios
    let data;
    if (debugCounter === 0) data = newCommentsMulti;
    else data = newCommentsSingle;
    debugCounter++;
    dispatch(notificationsUpdate(formatComments(data)));
    //localNotification();
  };
};

formatComments = data => {
  let formattedData = {};
  for (let i = 0; i < data.length; i++) {
    const itemPK = data[i].itemPK;
    const fatherPK =
      data[i].fatherPK !== undefined ? data[i].fatherPK : data[i].pk;
    if (!formattedData[itemPK])
      formattedData[itemPK] = {
        itemPK,
        fatherPK,
        commentPK: data[i].pk,
        book: data[i].book
      };
    else if (
      !formattedData[itemPK].commentPK ||
      formattedData[itemPK].fatherPK !== fatherPK
    )
      formattedData[itemPK].commentPK = null;
  }
  return formattedData;
};
