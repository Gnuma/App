import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import update from "immutability-helper";

const initialState = {
  data: null,
  orderedData: null,
  error: null,
  focus: null
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
        chat.messages[0] && chat.messages[0].timestamp > lastMsg
          ? chat.messages[0].timestamp
          : lastMsg;
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

const salesNewMsg = (state, action) => {
  hasNews = !state.data[action.payload.item].chats[action.payload.chat].hasNews;

  return update(state, {
    data: {
      [action.payload.item]: {
        chats: {
          [action.payload.chat]: {
            messages: { $unshift: [action.payload.msg] },
            hasNews: { $set: hasNews }
          }
        },
        newsCount: {
          $set: hasNews
            ? state.data[action.payload.item].newsCount + 1
            : state.data[action.payload.item].newsCount
        }
      }
    }
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SALES_INIT:
      return salesInit(state, action);

    case actionTypes.SALES_FAIL:
      return salesError(state, action);

    case actionTypes.SALES_SET_FOCUS:
      return salesFocus(state, action);

    case actionTypes.SALES_NEW_MSG:
      return salesNewMsg(state, action);

    default:
      return state;
  }
};

export default reducer;
