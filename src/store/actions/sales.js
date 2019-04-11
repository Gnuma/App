import * as actionTypes from "./actionTypes";
import { sellerChatList, newSellerMsg } from "../../mockData/Chat2";

export const salesInit = data => {
  return {
    type: actionTypes.SALES_INIT,
    payload: {
      data
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

export const salesNewMessage = (item, chat, msg) => {
  return {
    type: actionTypes.SALES_NEW_MSG,
    payload: {
      item,
      chat,
      msg
    }
  };
};

export const testNewMessage = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(
        salesNewMessage(newSellerMsg.item, newSellerMsg.chat, newSellerMsg.msg)
      );
    }, 6000);
  };
};
