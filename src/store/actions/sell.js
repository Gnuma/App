import * as actionTypes from "./actionTypes";
import NavigatorService from "../../navigator/NavigationService";
import { setItem, getItem, removeItem } from "../utility";
import axios from "axios";
import uuid from "uuid";
import { ___BASE_UPLOAD_PICTURE___, ___CREATE_AD___ } from "../constants";
import RNFetchBlob from "rn-fetch-blob";

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
      description
    } = getState().sell;
    const { token } = getState().auth;
    let activePreviews = [];
    for (let i = 0; i < previewsOrder.length; i++) {
      if (previews[previewsOrder[i]] !== null) {
        activePreviews.push(previews[previewsOrder[i]].base64);
      }
    }
    if (activePreviews.length > 0) {
      let uploadStatus = activePreviews.length;
      for (let i = 0; i < activePreviews.length; i++) {
        RNFetchBlob.fetch(
          "POST",
          ___BASE_UPLOAD_PICTURE___ + "IMG" + ".jpg/",
          {
            Authorization: "Token " + token,
            "Content-Type": "image/jpeg"
          },
          activePreviews[i]
        )
          .then(res => {
            console.log(res);
            const status = res.respInfo.status;
            console.log(status, uploadStatus);
            if (status === 201) {
              uploadStatus--;
              if (uploadStatus === 0) {
                createAD(dispatch, book, price, conditions, description);
              }
            } else {
              console.warn("Something went wrongato", status);
              dispatch(sellFail("Error in image Upload"));
            }
          })
          .catch(err => {
            console.warn("Something went wrongato", err.response);
            dispatch(sellFail("Error in image Upload"));
          });
      }
    } else {
      dispatch(sellFail("No images selected"));
    }
  };
};

const createAD = (dispatch, book, price, conditions, description) => {
  console.log("Creating Ad for " + book);
  axios
    .post(___CREATE_AD___, {
      isbn: book,
      price,
      condition: conditions,
      description
    })
    .then(res => {
      console.log(res);
      dispatch(sellSuccess());
      NavigatorService.navigate("Home");
    })
    .catch(err => {
      console.warn("Something went wrongato", err.response);
      dispatch(sellFail("Error in ad creation"));
      NavigatorService.navigate("Home");
    });
};
