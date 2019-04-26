import { ChatType } from "../../utils/constants";
import NetInfo from "@react-native-community/netinfo";
import {
  shoppingConfirmMsg,
  shoppingSendMsg,
  shoppingRetrieveData,
  shoppingStartGlobalAction
} from "./shopping";
import uuid from "uuid";
import {
  salesConfirmMsg,
  salesSendMsg,
  salesRetrieveData,
  salesStartGlobalAction
} from "./sales";
import { sellerChatList, buyerChatList2 } from "../../mockData/Chat2";

queue = [];

export const sendMessage = (type, objectID, chatID) => {
  return (dispatch, getState) => {
    const myID = 1; //TESTING
    const content = getState()[type].data[objectID].chats[chatID].composer;
    const msg = createMsg(content, myID);
    dispatch(startSending(type, objectID, chatID, msg));
    //Connection check
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        //API
        setTimeout(() => {
          dispatch(confirmMessage(type, objectID, chatID, msg));
        }, 2000);
      } else {
        queue.push({
          type,
          objectID,
          chatID,
          msg
        });
      }
    });
  };
};

export const restart = resolve => {
  return dispatch => {
    while (queue.length !== 0) {
      const item = queue.shift();
      dispatch(retrySend(item));
    }
    dispatch(shoppingStartGlobalAction());
    dispatch(salesStartGlobalAction());

    //API
    setTimeout(() => {
      dispatch(shoppingRetrieveData(buyerChatList2));
      dispatch(salesRetrieveData(sellerChatList));
      resolve();
    }, 2000);
  };
};

const retrySend = ({ type, objectID, chatID, msg }) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(confirmMessage(type, objectID, chatID, msg));
    }, 1000);
  };
};

const startSending = (type, objectID, chatID, msg) => {
  return type === ChatType.shopping
    ? shoppingSendMsg(objectID, chatID, msg)
    : salesSendMsg(objectID, chatID, msg);
};

const confirmMessage = (type, objectID, chatID, msg) => {
  return type === ChatType.shopping
    ? //Shopping
      shoppingConfirmMsg(objectID, chatID, msg._id, {
        isSending: false,
        _id: uuid.v4()
      })
    : //Sales
      salesConfirmMsg(objectID, chatID, msg._id, {
        isSending: false,
        _id: uuid.v4()
      });
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
