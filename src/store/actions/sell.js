import * as actionTypes from "./actionTypes";
import NavigatorService from "../../navigator/NavigationService";
import { setItem, getItem, removeItem } from "../utility";
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";
import FormData from "form-data";
import uuid from "uuid";
import { ___BASE_UPLOAD_PICTURE___, ___CREATE_AD___ } from "../constants";
import { ___BOOK_IMG_RATIO___ } from "../../utils/constants";

const isOffline = true;

export const sellStart = () => {
  return {
    type: actionTypes.SELL_START
  };
};

export const sellSuccess = () => {
  return {
    type: actionTypes.SELL_SUCCESS
  };
};

export const sellFail = error => {
  return {
    type: actionTypes.SELL_FAIL,
    payload: {
      error
    }
  };
};

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

export const createBook = (title, isbn) => {
  return {
    type: actionTypes.SELL_CREATEBOOK,
    payload: {
      title,
      isbn
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
    dispatch(sellStart());
    const {
      previews,
      previewsOrder,
      book,
      price,
      conditions,
      description,
      isbn,
      title
    } = getState().sell;
    const { token } = getState().auth;
    let data = new FormData();
    let counter = 0;
    for (let i = 0; i < previewsOrder.length; i++) {
      if (previews[previewsOrder[i]] !== null) {
        data.append(counter.toString(), previews[previewsOrder[i]].base64);
        counter++;
      }
    }

    if (book) {
      data.append("isbn", book);
    } else {
      data.append("isbn", isbn);
      data.append("title", title);
    }
    data.append("price", price);
    data.append("condition", conditions);
    data.append("description", description);

    if (counter > 0) {
      axios
        .post(___CREATE_AD___, data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data`
          }
        })
        .then(res => {
          console.log(res);
          dispatch(sellSuccess());
          NavigatorService.navigate("Home");
        })
        .catch(err => {
          console.warn("Something went wrongato", "Error in creation");
          dispatch(sellFail(err));
          //NavigatorService.navigate("Home");
        });
    } else {
      dispatch(sellFail("No images selected"));
    }
  };
};
