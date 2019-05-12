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
  let formattedData = {};

  for (let i = 0; i < data.length; i++) {
    let itemID = data[i].comment.item.pk;
    const type = data[i].type;
    if (!formattedData[itemID]) orderedData.push(itemID);
    formattedData = update(formattedData, {
      [itemID]: item =>
        update(
          item || {
            commentsList: [],
            item: data[i].comment.item
          },
          {
            commentsList: { $push: [data[i].comment.pk] },
            [type]: { $set: true }
          }
        )
    });
  }

  return update(state, {
    data: { $set: formattedData },
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

const commentsRead = (state, action) => {
  return state;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMMENTS_INIT:
      return commentsInit(state, action);
    case actionTypes.COMMENTS_RECEIVE_COMMENT:
      return commentsReceiveComment(state, action);
    case actionTypes.COMMENTS_READ:
      return commentsRead(state, action);
    default:
      return state;
  }
};

export default reducer;
