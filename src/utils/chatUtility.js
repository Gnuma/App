import uuid from "uuid";
import { OffertStatus } from "../views/BookOffert";
import { ___READ_CHAT___ } from "../store/constants";
import axios from "axios";

export const getSubjectIndex = (subjectID, state) => {
  for (let i = 0; i < state.orderedData.length; i++) {
    if (state.orderedData[i].subjectID === subjectID) return i;
  }
  return -1;
};

export const getItemIndex = (itemID, state) => {
  for (let i = 0; i < state.orderedData.length; i++) {
    if (state.orderedData[i].itemID === itemID) return i;
  }
  return -1;
};

export const getChatIndex = (chatID, item) => {
  for (let i = 0; i < item.chats.length; i++) {
    if (item.chats[i] === chatID) return i;
  }
  return -1;
};

export const highlightItem = (array, index) =>
  array.splice(index, 1).concat(array);

export const createOffert = (user, price, pk) => ({
  creator: user,
  createdAt: new Date(),
  value: price,
  status: OffertStatus.PENDING,
  _id: pk
});

export const createSystemMessage = text => ({
  createdAt: new Date(),
  _id: uuid.v4(),
  text,
  system: true,
  is_read: false
});

export const sendReadNotification = (chat, from, to) => {
  axios
    .post(___READ_CHAT___, {
      chat,
      from,
      to
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log({ err });
    });
};
