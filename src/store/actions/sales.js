import * as actionTypes from "./actionTypes";
import { sellerChatList, newSellerMsg } from "../../mockData/Chat2";
import ws from "../../utils/WebSocket";
import uuid from "uuid";

export const salesInit = data => {
  /*
  ws.init();
  ws.onMessage(msg => {
    console.log(msg.data);
  });
  */
  return {
    type: actionTypes.SALES_INIT,
    payload: {
      data
    }
  };
};

export const salesStartAction = (itemID, chatID) => {
  return {
    type: actionTypes.SALES_START_ACTION,
    payload: {
      itemID,
      chatID
    }
  };
};

export const salesFail = error => {
  return {
    type: actionTypes.SALES_FAIL,
    payload: {
      error: error
    }
  };
};

export const salesSetFocus = focus => {
  return {
    type: actionTypes.SALES_SET_FOCUS,
    payload: {
      focus
    }
  };
};

export const salesSetComposer = (itemID, chatID, composer) => {
  return {
    type: actionTypes.SALES_SET_COMPOSER,
    payload: {
      itemID,
      chatID,
      composer
    }
  };
};

export const salesReceiveMsg = (item, chat, msg) => {
  return {
    type: actionTypes.SALES_RECEIVE_MSG,
    payload: {
      item,
      chat,
      msg
    }
  };
};

export const salesConfirmMsg = (itemID, chatID, msgID, data) => {
  return {
    type: actionTypes.SALES_CONFIRM_MSG,
    payload: {
      itemID,
      chatID,
      msgID,
      data
    }
  };
};

export const salesSendMsg = (itemID, chatID, msg) => {
  return {
    type: actionTypes.SALES_SEND_MSG,
    payload: {
      itemID,
      chatID,
      msg
    }
  };
};

export const salesReadChat = (itemID, chatID) => {
  return {
    type: actionTypes.SALES_READ_CHAT,
    payload: {
      itemID,
      chatID
    }
  };
};

export const salesSettleChat = (itemID, chatID, status) => {
  return {
    type: actionTypes.SALES_SETTLE_CHAT,
    payload: {
      itemID,
      chatID,
      status
    }
  };
};

export const testNewMessage = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(
        salesReceiveMsg(newSellerMsg.item, newSellerMsg.chat, newSellerMsg.msg)
      );
    }, 6000);
  };
};

export const salesSend = (itemID, chatID) => {
  return (dispatch, getState) => {
    const myID = 1; //TESTING
    const content = getState().sales.data[itemID].chats[chatID].composer;
    const msg = createMsg(content, myID);
    dispatch(salesSendMsg(itemID, chatID, msg));
    setTimeout(
      () =>
        dispatch(
          salesConfirmMsg(itemID, chatID, msg._id, {
            isSending: false,
            _id: uuid.v4()
          })
        ),
      2000
    );
    //ADD Reject
  };
};

const createMsg = (content, userID) => {
  return {
    _id: uuid.v4(),
    text: content,
    createdAt: new Date(),
    user: {
      _id: userID
    },
    isRead: true,
    isSending: true
  };
};

export const salesRead = (itemID, chatID) => {
  return dispatch => {
    //API to set read (TO-DO)
    dispatch(salesReadChat(itemID, chatID));
  };
};

export const salesSettle = (itemID, chatID, isAccepting) => {
  return dispatch => {
    dispatch(salesStartAction(itemID, chatID));
    //API
    setTimeout(() => {
      if (isAccepting) {
        dispatch(salesSettleChat(itemID, chatID, "progress"));
      } else {
        dispatch(salesSettleChat(itemID, chatID, "rejected"));
      }
    }, 1000);
  };
};
