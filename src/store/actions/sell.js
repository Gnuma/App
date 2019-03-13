import * as actionTypes from "./actionTypes";
import NavigatorService from "../../navigator/NavigationService";
import { setItem, getItem, removeItem } from "../utility";
import axios from "axios";
import uuid from "uuid";
import { ___BASE_UPLOAD_PICTURE___ } from "../constants";

const isOffline = true;

export const takePreview = data => {
  return {
    type: actionTypes.SELL_TAKEPREVIEW,
    payload: {
      data
    }
  };
};

export const setPreviewsOrder = order => {
  return {
    type: actionTypes.SELL_SET_PREVIEWSORDER,
    payload: {
      order
    }
  };
};

export const deletePreview = index => {
  return {
    type: actionTypes.SELL_DELETE_PREVIEW,
    payload: {
      index
    }
  };
};

export const selectBook = book => {
  return {
    type: actionTypes.SELL_SELECTBOOK,
    payload: {
      book
    }
  };
};

export const setPrice = price => {
  return {
    type: actionTypes.SELL_SET_PRICE,
    payload: {
      price
    }
  };
};

export const setConditions = conditions => {
  return {
    type: actionTypes.SELL_SET_CONDITIONS,
    payload: {
      conditions
    }
  };
};

export const setDescription = description => {
  return {
    type: actionTypes.SELL_SET_DESCRIPTION,
    payload: {
      description
    }
  };
};

export const submit = () => {
  return (dispatch, getState) => {
    const {
      previews,
      previewsOrder,
      book,
      price,
      conditions,
      description
    } = getState().sell;
    let activePreviews = [];
    for (let i = 0; i < previewsOrder.length; i++) {
      if (previews[previewsOrder[i]] !== null) {
        axios
          .post(
            ___BASE_UPLOAD_PICTURE___ + uuid.v4() + "/",
            previews[previewsOrder[i]].base64,
            {
              headers: { "Content-Type": "image/jpeg" }
            }
          )
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    }

    console.log(activePreviews, book, price, conditions, description);
  };
};
