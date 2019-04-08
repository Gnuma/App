import * as actionTypes from "./actionTypes";
import { sellerChatList } from "../../mockData/Chat2";

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
