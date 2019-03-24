import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  sellerChats: {},
  buyerChats: {},
  messages: {},
  user: null
};

const msgConnect = (state, action) => {
  return updateObject(state, {
    user: action.payload.userID
  });
};

const msgChatUpdate = (state, action) => {
  const { chatID, chatData, type } = action.payload;
  const toType = type === "buyerChats" ? "seller" : "buyer";
  const userType = type === "buyerChats" ? "buyer" : "seller";
  const data = {
    to: chatData[toType],
    userType,
    status: chatData.status,
    id: chatID
  };
  return updateObject(state, {
    [type]: { ...state[type], [chatID]: data }
  });
};

const msgMessagesUpdate = (state, action) => {
  const { chatID, messages } = action.payload;
  return updateObject(state, {
    messages: {
      ...state.messages,
      [chatID]: messages
    }
  });
};

const addChat = (chat, type) => {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MSG_CONNECT:
      return msgConnect(state, action);
    case actionTypes.MSG_CHATUPDATE:
      return msgChatUpdate(state, action);
    case actionTypes.MSG_MESSAGESUPDATE:
      return msgMessagesUpdate(state, action);
    default:
      return state;
  }
};

export default reducer;

/*
  const { chatID, chatData, initialMessages, type } = action.payload;

  let newChat;
  if (type === "buyer") {
    newChat = {
      userTo: chatData.seller,
      messages: initialMessages
    };
    return updateObject(state, {
      buyerChats: {
        ...state.buyerChats,
        [chatID]: newChat
      }
    });
  } else {
    newChat = {
      userTo: chatData.buyer,
      messages: initialMessages
    };
    return updateObject(state, {
      sellerChats: {
        ...state.sellerChats,
        [chatID]: newChat
      }
    });
  }
  */

/*
const msgListenToChats = (state, action) => {
  const { chatsRef, type } = action.payload;

  let unsubscriber, key;
  if (type === "buyer") {
    unsubscriber = chatsRef.onSnapshot(chatsSnapshot => {
      chatsSnapshot.forEach(chat => console.log(chat));
    });
    key = "buyerChats";
  } else {
    unsubscriber = chatsRef.onSnapshot(chatsSnapshot => {
      chatsSnapshot.forEach(chat => console.log(chat));
    });
    key = "sellerChats";
  }

  return updateObject(state, {
    [key]: {
      unsubscriber
    }
  });
};
*/
