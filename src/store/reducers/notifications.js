import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import update from "immutability-helper";

const initialState = {
  notifications: {},
  idSubscription: null
};

const notificationsUpdate = (state, action) => {
  return updateObject(state, {
    notifications: action.payload.notifications
  });
};

const notificationsSubscribe = (state, action) => {
  return updateObject(state, {
    idSubscription: action.payload.idSubscription
  });
};

const notificationsUnsubscribe = (state, action) => {
  clearInterval(state.idSubscription);
  return updateObject(state, {
    idSubscription: null,
    notifications: {}
  });
};

const notificationViewItem = (state, action) => {
  return update(state, {
    notifications: { $unset: [action.payload.itemPK] }
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOTIFICATIONS_UPDATE:
      return notificationsUpdate(state, action);

    case actionTypes.NOTIFICATIONS_SUBSCRIBE:
      return notificationsSubscribe(state, action);

    case actionTypes.NOTIFICATIONS_UNSUBSCRIBE:
      return notificationsUnsubscribe(state, action);

    case actionTypes.NOTIFICATIONS_VIEW_ITEM:
      return notificationViewItem(state, action);

    default:
      return state;
  }
};

export default reducer;
