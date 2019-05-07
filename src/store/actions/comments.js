import * as actionTypes from "./actionTypes";
import ws from "../../utils/WebSocket";
import NetInfo from "@react-native-community/netinfo";
import { AppState } from "react-native";

export const init = data => ({
  type: actionTypes.COMMENTS_INIT,
  payload: {
    data
  }
});

export const commentsReceiveComment = (comment, type) => ({
  type: actionTypes.COMMENTS_RECEIVE_COMMENT,
  payload: {
    comment,
    type
  }
});

export const commentsReceiveAnswer = answer => ({
  type: actionTypes.COMMENTS_RECEIVE_ANSWER,
  payload: {
    answer
  }
});

export const commentsInit = data => {
  return dispatch => {
    dispatch(init(data));
  };
};