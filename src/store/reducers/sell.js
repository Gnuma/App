import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import update from "immutability-helper";

const initialState = {
  previews: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null
  },
  previewsOrder: [0, 1, 2, 3, 4],
  book: null,
  price: "",
  conditions: null,
  description: ""
};

const takePreview = (state, action) => {
  let index = -1;
  for (let i = 0; i < state.previewsOrder.length; i++) {
    index = state.previewsOrder[i];
    if (state.previews[index] === null) break;
  }
  return update(state, {
    previews: {
      [index]: { $set: action.payload.data }
    }
  });
};

const deletePreview = (state, action) => {
  const index = state.previewsOrder[action.payload.index];
  return update(state, {
    previews: {
      [index]: { $set: null }
    }
  });
};

const setPreviewsOrder = (state, action) => {
  return updateObject(state, {
    previewsOrder: action.payload.order
  });
};

const selectBook = (state, action) => {
  return updateObject(state, {
    book: action.payload.book
  });
};

const setPrice = (state, action) => {
  return updateObject(state, {
    price: action.payload.price
  });
};

const setConditions = (state, action) => {
  return updateObject(state, {
    conditions: action.payload.conditions
  });
};

const setDescription = (state, action) => {
  return updateObject(state, {
    description: action.payload.description
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELL_TAKEPREVIEW:
      return takePreview(state, action);

    case actionTypes.SELL_DELETE_PREVIEW:
      return deletePreview(state, action);

    case actionTypes.SELL_SET_PREVIEWSORDER:
      return setPreviewsOrder(state, action);

    case actionTypes.SELL_SELECTBOOK:
      return selectBook(state, action);

    case actionTypes.SELL_SET_PRICE:
      return setPrice(state, action);

    case actionTypes.SELL_SET_CONDITIONS:
      return setConditions(state, action);

    case actionTypes.SELL_SET_DESCRIPTION:
      return setDescription(state, action);

    default:
      return state;
  }
};

export default reducer;
