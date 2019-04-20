import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import update from "immutability-helper";
import {
  getItemIndex,
  getChatIndex,
  highlightItem
} from "../../utils/chatUtility";

const initialState = {
  data: null,
  orderedData: null,
  error: null,
  focus: null,
  chatFocus: null
};

const salesInit = (state, action) => {
  const data = action.payload.data;
  let orderedData = [];
  for (itemKey in data) {
    let lastMsg = new Date(0, 0, 0);
    const item = data[itemKey].chats;
    //orderedData.push(itemKey);
    let orderedChats = [];
    for (chatKey in item) {
      orderedChats.push(chatKey); //TO-DO
      const chat = item[chatKey];
      lastMsg =
        chat.messages[0] && chat.messages[0].createdAt > lastMsg
          ? chat.messages[0].createdAt
          : lastMsg;
      data[itemKey].chats[chatKey] = {
        ...data[itemKey].chats[chatKey],
        composer: "",
        loading: false
      };
    }
    orderedData.push({ itemID: itemKey, chats: orderedChats }); //TO-DO
    data[itemKey] = { ...data[itemKey], lastMsg };
  }
  return updateObject(state, {
    data,
    orderedData,
    focus: 0
  });
};

const salesStartAction = (state, action) => {
  const { itemID, chatID } = action.payload;
  return update(state, {
    data: {
      [itemID]: {
        chats: {
          [chatID]: {
            loading: { $set: true }
          }
        }
      }
    }
  });
};

const salesError = (state, action) => {
  return updateObject(state, {
    error: action.payload.error
  });
};

const salesFocus = (state, action) => {
  return updateObject(state, {
    focus: action.payload.focus
  });
};

const salesComposer = (state, action) => {
  const { itemID, chatID, composer } = action.payload;
  return update(state, {
    data: {
      [itemID]: {
        chats: {
          [chatID]: {
            composer: { $set: composer }
          }
        }
      }
    }
  });
};

const salesReceiveMsg = (state, action) => {
  const { item, chat, msg } = action.payload;
  inChat = state.chatFocus === chat; //TO-DO
  const itemIndex = getItemIndex(item, state);
  console.log(state.orderedData, itemIndex);
  const chatIndex = getChatIndex(chat, state.orderedData[itemIndex]);
  console.log(itemIndex, chatIndex);

  return update(state, {
    data: {
      [item]: {
        chats: {
          [chat]: {
            messages: { $unshift: [msg] },
            hasNews: { $set: !inChat }
          }
        },
        newsCount: {
          $set: !inChat
            ? state.data[item].newsCount + 1
            : state.data[item].newsCount
        }
      }
    },
    orderedData: {
      [itemIndex]: {
        chats: {
          $apply: item => highlightItem(item, chatIndex)
        }
      }
    }
  });
};

const salesSendMsg = (state, action) => {
  const { itemID, chatID, msg } = action.payload;

  const itemIndex = getItemIndex(itemID, state);
  const chatIndex = getChatIndex(chatID, state.orderedData[itemIndex]);

  console.log(itemID, chatID, msg);
  return update(state, {
    data: {
      [itemID]: {
        chats: {
          [chatID]: {
            messages: { $unshift: [msg] },
            composer: { $set: "" }
          }
        }
      }
    },
    orderedData: {
      [itemIndex]: {
        chats: {
          $apply: item => highlightItem(item, chatIndex)
        }
      }
    }
  });
};

const salesConfirmMsg = (state, action) => {
  const { itemID, chatID, msgID, data } = action.payload;
  try {
    const chat = state.data[itemID].chats[chatID].messages;
    console.log(data);
    for (let i = 0; i < chat.length; i++) {
      if (chat[i]._id == msgID) {
        return update(state, {
          data: {
            [itemID]: {
              chats: {
                [chatID]: {
                  messages: { [i]: { $merge: data } }
                }
              }
            }
          }
        });
      }
    }
    throw "Message Not Found when confirming";
  } catch (error) {
    console.warn(error);
    console.log(error);
  }
  return state;
};

const salesReadChat = (state, action) => {
  const { itemID, chatID } = action.payload;
  const hasNews = state.data[itemID].chats[chatID].hasNews;
  console.log(state, action);
  return update(state, {
    data: {
      [itemID]: {
        newsCount: {
          $apply: oldCount => {
            return hasNews ? oldCount - 1 : oldCount;
          }
        },
        chats: {
          [chatID]: {
            hasNews: { $set: false }
          }
        }
      }
    }
  });
};

const salesSettleChat = (state, action) => {
  const { itemID, chatID, status } = action.payload;
  return update(state, {
    data: {
      [itemID]: {
        chats: {
          [chatID]: {
            status: { $set: status },
            loading: { $set: false }
          }
        }
      }
    }
  });
};

const salesSetChatFocus = (state, action) => {
  const { chatID } = action.payload;
  return updateObject(state, {
    chatFocus: chatID
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SALES_INIT:
      return salesInit(state, action);

    case actionTypes.SALES_START_ACTION:
      return salesStartAction(state, action);

    case actionTypes.SALES_FAIL:
      return salesError(state, action);

    case actionTypes.SALES_SET_FOCUS:
      return salesFocus(state, action);

    case actionTypes.SALES_SET_COMPOSER:
      return salesComposer(state, action);

    case actionTypes.SALES_RECEIVE_MSG:
      return salesReceiveMsg(state, action);

    case actionTypes.SALES_SEND_MSG:
      return salesSendMsg(state, action);

    case actionTypes.SALES_CONFIRM_MSG:
      return salesConfirmMsg(state, action);

    case actionTypes.SALES_READ_CHAT:
      return salesReadChat(state, action);

    case actionTypes.SALES_SETTLE_CHAT:
      return salesSettleChat(state, action);

    case actionTypes.SALES_SET_CHAT_FOCUS:
      return salesSetChatFocus(state, action);

    default:
      return state;
  }
};

export default reducer;
