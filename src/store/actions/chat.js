import * as actionTypes from "./actionTypes";
import uuid from "uuid";
import NetInfo from "@react-native-community/netinfo";
import {
  ___CREATE_OFFERT___,
  ___REJECT_OFFERT___,
  ___ACCEPT_OFFERT___,
  ___READ_CHAT___,
  ___CONTACT_USER___
} from "../constants";
import { loadMockNew } from "../../mockData/Chat2";
import protectedAction from "../../utils/protectedAction";
import axios from "axios";
import NavigationService from "../../navigator/NavigationService";
import { mergeMap, map, catchError, filter } from "rxjs/operators";
import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";

export const chatInit = (salesData, shoppingData) => ({
  type: actionTypes.CHAT_INIT,
  payload: {
    salesData,
    shoppingData
  }
});

export const chatClear = () => ({ type: actionTypes.SALES_CLEAR });

export const chatStartGlobalAction = () => ({
  type: actionTypes.CHAT_START_GLOBAL_ACTION
});

export const chatStartChatAction = (objectID, chatID) => ({
  type: actionTypes.CHAT_START_CHAT_ACTION,
  payload: {
    objectID,
    chatID
  }
});

export const chatFail = error => ({
  type: actionTypes.CHAT_FAIL,
  payload: { error }
});

export const chatSetSalesListFocus = focus => ({
  type: actionTypes.CHAT_SET_SALES_LIST_FOCUS,
  payload: { focus }
});

export const chatSetShoppingListFocus = focus => ({
  type: actionTypes.CHAT_SET_SHOPPING_LIST_FOCUS,
  payload: { focus }
});

export const chatSetChatFocus = (objectID, chatID) => ({
  type: actionTypes.CHAT_SET_CHAT_FOCUS,
  payload: { objectID, chatID }
});

export const chatSetComposer = (objectID, chatID, value) => ({
  type: actionTypes.CHAT_SET_COMPOSER,
  payload: { value, objectID, chatID }
});

export const chatReceiveMessage = (objectID, chatID, msg, type) => ({
  type: actionTypes.CHAT_RECEIVE_MSG,
  payload: {
    objectID,
    chatID,
    msg,
    type
  }
});

export const chatSendMsg = (objectID, chatID, msg, type) => ({
  type: actionTypes.CHAT_SEND_MSG,
  payload: {
    objectID,
    chatID,
    msg,
    type
  }
});

export const chatConfirmMsg = (objectID, chatID, msgID, data) => ({
  type: actionTypes.CHAT_CONFIRM_MSG,
  payload: {
    objectID,
    chatID,
    msgID,
    data
  }
});

/*
export const chatRead = (objectID, chatID) => ({
  type: actionTypes.CHAT_READ,
  payload: {
    objectID,
    chatID
  }
});
*/

export const chatNewChat = (objectID, chatID, data) => ({
  type: actionTypes.CHAT_NEW_CHAT,
  payload: {
    objectID,
    chatID,
    data
  }
});

export const chatStartStatusAction = (objectID, chatID) => ({
  type: actionTypes.CHAT_START_STATUS_ACTION,
  payload: {
    objectID,
    chatID
  }
});

export const chatNewOffert = (objectID, chatID, offertID, price, user) => ({
  type: actionTypes.CHAT_NEW_OFFERT,
  payload: {
    price,
    objectID,
    chatID,
    pk: offertID,
    user
  }
});

export const chatRemoveOffert = (objectID, chatID) => ({
  type: actionTypes.CHAT_REMOVE_OFFERT,
  payload: {
    objectID,
    chatID
  }
});

export const chatOffertFail = (objectID, chatID) => ({
  type: actionTypes.CHAT_OFFERT_FAIL,
  payload: {
    objectID,
    chatID
  }
});

const chatSettleAction = (objectID, chatID, status) => ({
  type: actionTypes.CHAT_SETTLE,
  payload: {
    objectID,
    chatID,
    status
  }
});

// ---THUNK---

export const chatRead = (objectID, chatID) => (dispatch, getState) => {
  const chat = getState().chat.data[objectID].chats[chatID];
  console.log(chat.hasNews);
  if (chat.hasNews) {
    const from = chat.messages[chat.hasNews - 1]._id;
    const to = chat.messages[0]._id;
    axios
      .post(___READ_CHAT___, {
        chat: chatID,
        from,
        to
      })
      .then(res => console.log(res))
      .catch(err => console.log({ err }));
    dispatch({
      type: actionTypes.CHAT_READ,
      payload: {
        objectID,
        chatID
      }
    });
  } else {
    console.log("Chat had no news");
  }
};

export const chatSettle = (objectID, chatID, isAccepting) => dispatch => {
  dispatch(chatStartChatAction(objectID, chatID));
  //API
  setTimeout(() => {
    if (isAccepting) {
      dispatch(chatSettleAction(objectID, chatID, "pending"));
    } else {
      dispatch(chatSettleAction(objectID, chatID, "rejected"));
    }
  }, 1000);
};

export const chatRequestContact = (objectID, chatID) => dispatch => {
  dispatch(chatStartChatAction(objectID, chatID));
  //API
  setTimeout(() => {
    dispatch(chatSettleAction(objectID, chatID, "pending"));
  }, 1000);
};

export const chatLoadEarlier = (objectID, chatID) => dispatch => {
  dispatch(chatStartChatAction(objectID, chatID));
  //API
  setTimeout(() => {
    dispatch({
      type: actionTypes.CHAT_LOAD_EARLIER,
      payload: {
        objectID,
        chatID,
        data: loadMockNew()
      }
    });
  }, 2000);
};

export const chatContactUser = item => dispatch => {
  protectedAction()
    .then(() =>
      axios.post(___CONTACT_USER___, {
        item: item.pk
      })
    )
    .then(res => {
      console.log(res);
      dispatch({
        type: actionTypes.CHAT_CONTACT_USER,
        payload: {
          item: res.data.item,
          chatID: res.data._id
        }
      });
      NavigationService.navigate("ShoppingChat", {
        chatID: res.data._id,
        subjectID: "s" + res.data.item.book.subject._id
      });
    })
    .catch(err => chatFail(err));
};

export const chatCreateOffert = (objectID, chatID, price) => (
  dispatch,
  getState
) => {
  dispatch(chatStartStatusAction(objectID, chatID));
  axios
    .post(___CREATE_OFFERT___, {
      offert: price,
      chat: chatID
    })
    .then(res => {
      console.log(res);
      const { username, id } = getState().auth;
      dispatch(
        chatNewOffert(objectID, chatID, res.data.pk, price, {
          _id: id,
          user: {
            username
          }
        })
      );
    })
    .catch(err => {
      console.log({ err });
      dispatch(chatOffertFail(objectID, chatID));
    });
};

export const chatCancelOffert = (objectID, chatID) => dispatch => {
  dispatch(chatStartStatusAction(objectID, chatID));
  //API
  setTimeout(() => {
    dispatch(chatRemoveOffert(objectID, chatID));
  }, 2000);
};

export const chatRejectOffert = (objectID, chatID) => (dispatch, getState) => {
  dispatch(chatStartStatusAction(objectID, chatID));
  const offertID = getState().chat.data[objectID].chats[chatID].offerts[0]._id;
  axios
    .post(___REJECT_OFFERT___, {
      offert: offertID
    })
    .then(res => {
      console.log(res);
      dispatch(chatRemoveOffert(objectID, chatID));
    })
    .catch(err => {
      console.log({ err });
      dispatch(chatOffertFail(objectID, chatID));
    });
};

export const chatAcceptOffert = (objectID, chatID) => (dispatch, getState) => {
  dispatch(chatStartStatusAction(objectID, chatID));
  const offertID = getState().chat.data[objectID].chats[chatID].offerts[0]._id;
  axios
    .post(___ACCEPT_OFFERT___, {
      offert: offertID
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: actionTypes.CHAT_ACCEPT_OFFERT,
        payload: {
          objectID,
          chatID
        }
      });
    })
    .catch(err => {
      console.log({ err });
      dispatch(chatOffertFail(objectID, chatID));
    });
};

export const onNewMessage = (objectID, chatID, msg, type) => (
  dispatch,
  getState
) => {
  const state = getState().chat;
  dispatch(chatReceiveMessage(objectID, chatID, msg, type));
  if (state.chatFocus === chatID) {
    dispatch(chatRead(objectID, chatID));
  }
};

//  ---EPICS---
//newMessage inChat || open chat
const readChatEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.CHAT_SET_CHAT_FOCUS, actionTypes.CHAT_RECEIVE_MSG),
    filter(action => {
      const { chatID } = action.payload;
      return chatID !== null && state$.value.chat.chatFocus === chatID;
    }),
    /* 
    filter(action => {
      const { objectID, chatID } = action.payload;
      const chat = state$.value.chat.data[objectID].chats[chatID];
      console.log(objectID, chatID, chat);
      return chat.hasNews > 0;
    }),
    
    mergeMap(action => {
      const { objectID, chatID } = action.payload;
      const chat = state$.value.chat.data[objectID].chats[chatID];
      const from = chat.messagges[chat.hasNews - 1]._id;
      const to = chat.messagges[0]._id;
      return ajax
        .post(
          ___READ_CHAT___,
          {
            chat: chatID,
            from,
            to
          },
          {
            Authorization: "Token " + state$.value.auth.token
          }
        )
        .pipe(
          map(response => {
            console.log("CHAT_READ", response);
          }),
          catchError(error => {
            return of(chatFail(error));
          })
        );
    })
    */
    mergeMap(action => {
      const { objectID, chatID } = action.payload;
      return of(chatRead(objectID, chatID));
    })
  );

export const chatEpics = [readChatEpic];
