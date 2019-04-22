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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMMENTS_INIT:
      return commentsInit(state, action);
    default:
      return state;
  }
};

export default reducer;
