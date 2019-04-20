import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import update from "immutability-helper";
import {
  getSubjectIndex,
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

const shoppingInit = (state, action) => {
  const data = action.payload.data;
  let orderedData = [];
  for (subjectKey in data) {
    let lastMsg = new Date(0, 0, 0);
    const subject = data[subjectKey].chats;
    let orderedChats = [];
    for (chatKey in subject) {
      orderedChats.push(chatKey); //TO-DO
      const chat = subject[chatKey];
      lastMsg =
        chat.messages[0] && chat.messages[0].createdAt > lastMsg
          ? chat.messages[0].createdAt
          : lastMsg;
      data[subjectKey].chats[chatKey] = {
        ...data[subjectKey].chats[chatKey],
        composer: "",
        loading: false
      };
    }
    orderedData.push({ subjectID: subjectKey, chats: orderedChats }); //TO-DO
    data[subjectKey] = { ...data[subjectKey], lastMsg };
  }

  return updateObject(state, {
    data,
    orderedData,
    focus: 0
  });
};

const shoppingStartAction = (state, action) => {
  const { subjectID, chatID } = action.payload;
  return update(state, {
    data: {
      [subjectID]: {
        chats: {
          [chatID]: {
            loading: { $set: true }
          }
        }
      }
    }
  });
};

const shoppingError = (state, action) => {
  return updateObject(state, {
    error: action.payload.error
  });
};

const shoppingFocus = (state, action) => {
  return updateObject(state, {
    focus: action.payload.focus
  });
};

const shoppingComposer = (state, action) => {
  const { subjectID, chatID, composer } = action.payload;
  return update(state, {
    data: {
      [subjectID]: {
        chats: {
          [chatID]: {
            composer: { $set: composer }
          }
        }
      }
    }
  });
};

const shoppingReceiveMsg = (state, action) => {
  const { subjectID, chatID, msg } = action.payload;
  inChat = state.chatFocus === chatID; //TO-DO
  const subjectIndex = getSubjectIndex(subjectID, state);
  const chatIndex = getChatIndex(chatID, state.orderedData[subjectIndex]);

  return update(state, {
    data: {
      [subjectID]: {
        chats: {
          [chatID]: {
            messages: { $unshift: [msg] },
            hasNews: { $set: !inChat }
          }
        },
        newsCount: {
          $set: !inChat
            ? state.data[subjectID].newsCount + 1
            : state.data[subjectID].newsCount
        }
      }
    },
    orderedData: {
      [subjectIndex]: {
        chats: {
          $apply: subject => highlightItem(subject, chatIndex)
        }
      }
    }
  });
};

const shoppingSendMsg = (state, action) => {
  const { subjectID, chatID, msg } = action.payload;
  //console.log(subjectID, chatID, msg);
  const subjectIndex = getSubjectIndex(subjectID, state);
  const chatIndex = getChatIndex(chatID, state.orderedData[subjectIndex]);

  return update(state, {
    data: {
      [subjectID]: {
        chats: {
          [chatID]: {
            messages: { $unshift: [msg] },
            composer: { $set: "" }
          }
        }
      }
    },
    orderedData: {
      [subjectIndex]: {
        chats: {
          $apply: subject => highlightItem(subject, chatIndex)
        }
      }
    }
  });
};

const shoppingConfirmMsg = (state, action) => {
  const { subjectID, chatID, msgID, data } = action.payload;
  try {
    const chat = state.data[subjectID].chats[chatID].messages;
    console.log(data);
    for (let i = 0; i < chat.length; i++) {
      if (chat[i]._id == msgID) {
        return update(state, {
          data: {
            [subjectID]: {
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

const shoppingReadChat = (state, action) => {
  const { subjectID, chatID } = action.payload;
  //console.log(subjectID, chatID);
  const hasNews = state.data[subjectID].chats[chatID].hasNews;
  //console.log(hasNews);
  return update(state, {
    data: {
      [subjectID]: {
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

const shoppingSettleChat = (state, action) => {
  const { subjectID, chatID, status } = action.payload;
  return update(state, {
    data: {
      [subjectID]: {
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

const shoppingSetChatFocus = (state, action) => {
  const { chatID } = action.payload;
  return updateObject(state, {
    chatFocus: chatID
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOPPING_INIT:
      return shoppingInit(state, action);

    case actionTypes.SHOPPING_START_ACTION:
      return shoppingStartAction(state, action);

    case actionTypes.SHOPPING_FAIL:
      return shoppingError(state, action);

    case actionTypes.SHOPPING_SET_FOCUS:
      return shoppingFocus(state, action);

    case actionTypes.SHOPPING_SET_COMPOSER:
      return shoppingComposer(state, action);

    case actionTypes.SHOPPING_RECEIVE_MSG:
      return shoppingReceiveMsg(state, action);

    case actionTypes.SHOPPING_SEND_MSG:
      return shoppingSendMsg(state, action);

    case actionTypes.SHOPPING_CONFIRM_MSG:
      return shoppingConfirmMsg(state, action);

    case actionTypes.SHOPPING_READ_CHAT:
      return shoppingReadChat(state, action);

    case actionTypes.SHOPPING_SETTLE_CHAT:
      return shoppingSettleChat(state, action);

    case actionTypes.SHOPPING_SET_CHAT_FOCUS:
      return shoppingSetChatFocus(state, action);

    default:
      return state;
  }
};

export default reducer;
