import * as actionTypes from "./actionTypes";
import uuid from "uuid";
import NetInfo from "@react-native-community/netinfo";

const init = data => ({
  type: actionTypes.SHOPPING_INIT,
  payload: {
    data
  }
});

export const shoppingStartAction = (subjectID, chatID) => ({
  type: actionTypes.SHOPPING_START_ACTION,
  payload: {
    subjectID,
    chatID
  }
});

export const shoppingFail = error => ({
  type: actionTypes.SHOPPING_FAIL,
  payload: {
    error: error
  }
});

export const shoppingSetFocus = focus => {
  return {
    type: actionTypes.SHOPPING_SET_FOCUS,
    payload: {
      focus
    }
  };
};

export const shoppingSetComposer = (subjectID, chatID, composer) => ({
  type: actionTypes.SHOPPING_SET_COMPOSER,
  payload: {
    subjectID,
    chatID,
    composer
  }
});

export const shoppingReceiveMsg = (subjectID, chatID, msg) => ({
  type: actionTypes.SHOPPING_RECEIVE_MSG,
  payload: {
    subjectID,
    chatID,
    msg
  }
});

export const shoppingConfirmMsg = (subjectID, chatID, msgID, data) => ({
  type: actionTypes.SHOPPING_CONFIRM_MSG,
  payload: {
    subjectID,
    chatID,
    msgID,
    data
  }
});

export const shoppingSendMsg = (subjectID, chatID, msg) => ({
  type: actionTypes.SHOPPING_SEND_MSG,
  payload: {
    subjectID,
    chatID,
    msg
  }
});

export const shoppingReadChat = (subjectID, chatID) => ({
  type: actionTypes.SHOPPING_READ_CHAT,
  payload: {
    subjectID,
    chatID
  }
});

export const shoppingSettleChat = (subjectID, chatID, status) => {
  return {
    type: actionTypes.SHOPPING_SETTLE_CHAT,
    payload: {
      subjectID,
      chatID,
      status
    }
  };
};
connectionSubscription = null;
export const shoppingInit = data => {
  return dispatch => {
    connectionSubscription = NetInfo.isConnected.addEventListener(
      "connectionChange",
      isConnected => {
        if (isConnected) {
          dispatch(shoppingConnectionRestablished());
        }
      }
    );
    dispatch(init(data));
  };
};

export const shoppingSend = (subjectID, chatID) => {
  return (dispatch, getState) => {
    const myID = 1; //TESTING
    const content = getState().shopping.data[subjectID].chats[chatID].composer;
    const msg = createMsg(content, myID);
    dispatch(shoppingSendMsg(subjectID, chatID, msg));
    //Connection Check
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        setTimeout(
          //FAKE API ||| ADD REJECT
          () =>
            dispatch(
              shoppingConfirmMsg(subjectID, chatID, msg._id, {
                isSending: false,
                _id: uuid.v4()
              })
            ),
          2000
        );
        //ADD Reject
      } else {
        shoppingQueue.push({
          subjectID,
          chatID,
          msg
        });
      }
    });
  };
};

const createMsg = (content, userID) => {
  return {
    _id: uuid.v4(),
    text: content,
    createdAt: new Date(),
    user: {
      _id: userID
    },
    isRead: true,
    isSending: true
  };
};

export const shoppingRead = (subjectID, chatID) => {
  return dispatch => {
    //API TO SET READ
    dispatch(shoppingReadChat(subjectID, chatID));
  };
};

export const shoppingRequestContact = (subjectID, chatID) => {
  return dispatch => {
    dispatch(shoppingStartAction(subjectID, chatID));
    //API
    setTimeout(() => {
      dispatch(shoppingSettleChat(subjectID, chatID, "pending"));
    }, 1000);
  };
};

shoppingQueue = [];
isShoppingResending = false;
const shoppingConnectionRestablished = () => {
  return dispatch => {
    if (!isShoppingResending) {
      isShoppingResending = true;
      dispatch(shoppingRetrySend());
    }
  };
};

const shoppingRetrySend = () => {
  return dispatch => {
    if (shoppingQueue.length === 0) {
      isShoppingResending = false;
    } else {
      const { subjectID, chatID, msg } = shoppingQueue[0];
      //API
      setTimeout(() => {
        dispatch(
          shoppingConfirmMsg(subjectID, chatID, msg._id, {
            //Just for testing | replace with API results
            isSending: false,
            _id: uuid.v4()
          })
        );
        shoppingQueue.splice(0, 1);
        dispatch(shoppingRetrySend());
      }, 1000);
    }
  };
};
