import * as actionTypes from "./actionTypes";
import ws from "../../utils/WebSocket";
import uuid from "uuid";
import NetInfo from "@react-native-community/netinfo";

const init = data => {
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

export const salesSetChatFocus = chatID => {
  return {
    type: actionTypes.SALES_SET_CHAT_FOCUS,
    payload: {
      chatID
    }
  };
};

connectionSubscription = null;
export const salesInit = data => {
  return dispatch => {
    connectionSubscription = NetInfo.isConnected.addEventListener(
      "connectionChange",
      isConnected => {
        if (isConnected) {
          dispatch(salesConnectionRestablished());
        }
      }
    );
    /*
    ws.init();
    ws.onMessage(msg => {
      console.log(msg.data);
    });
    */
    dispatch(init(data));
  };
};

export const salesSend = (itemID, chatID) => {
  return (dispatch, getState) => {
    const myID = 1; //TESTING
    const content = getState().sales.data[itemID].chats[chatID].composer;
    const msg = createMsg(content, myID);
    dispatch(salesSendMsg(itemID, chatID, msg));

    //Connection CHECK
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        setTimeout(
          //FAKE API ||| ADD REJECT
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
      } else {
        saleQueue.push({
          itemID,
          chatID,
          msg
        });
      }
    });
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

saleQueue = [];
isSaleResending = false;
const salesConnectionRestablished = () => {
  return dispatch => {
    if (!isSaleResending) {
      isSaleResending = true;
      dispatch(salesRetrySend());
    }
  };
};

const salesRetrySend = () => {
  return dispatch => {
    if (saleQueue.length === 0) {
      isSaleResending = false;
    } else {
      const { itemID, chatID, msg } = saleQueue[0];
      //API
      setTimeout(() => {
        dispatch(
          salesConfirmMsg(itemID, chatID, msg._id, {
            //Just for testing | replace with API results
            isSending: false,
            _id: uuid.v4()
          })
        );
        saleQueue.splice(0, 1);
        dispatch(salesRetrySend());
      }, 1000);
    }
  };
};

export const onNewSalesMsg = (itemID, chatID, msg) => {
  return (dispatch, getState) => {
    dispatch(salesReceiveMsg(itemID, chatID, msg));
    if (getState().sales.chatFocus === chatID) {
      //Send API for read
    }
  };
};
