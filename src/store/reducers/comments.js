import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import update from "immutability-helper";

const initialState = {
  data: {},
  orderedData: [],
  error: null,
  loading: false
};

const commentsInit = (state, action) => {
  const { data } = action.payload;
  let orderedData = [];
  for (itemID in data) {
    //TO-DO
    orderedData.push(itemID);
  }
  return update(state, {
    data: { $set: data },
    orderedData: { $set: orderedData }
  });
};

const commentsReceiveComment = (state, action) => {
  const { comment, type } = action.payload;
  const commentID = comment.pk;
  const itemID = comment.item.pk;

  const newItem = {
    pk: itemID,
    type,
    book: comment.item.book,
    data: []
  };

  const hasNewItem = state.data[itemID] === undefined;

  return update(state, {
    data: {
      [itemID]: existingItem =>
        update(existingItem || newItem, {
          data: { $unshift: [{ pk: commentID, answers: [] }] }
        })
    },
    orderedData: hasNewItem ? { $unshift: [itemID] } : { $push: [] }
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMMENTS_INIT:
      return commentsInit(state, action);
    case actionTypes.COMMENTS_RECEIVE_COMMENT:
      return commentsReceiveComment(state, action);

    default:
      return state;
  }
};

export default reducer;
