import * as actionTypes from "./actionTypes";
import uuid from "uuid";
import NetInfo from "@react-native-community/netinfo";
import { buyerChatList, loadMockNew } from "../../mockData/Chat2";

export const shoppingInit = data => ({
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

export const shoppingStartGlobalAction = () => ({
  type: actionTypes.SHOPPING_START_GLOBAL_ACTION
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

export const shoppingSetChatFocus = chatID => {
  return {
    type: actionTypes.SHOPPING_SET_CHAT_FOCUS,
    payload: {
      chatID
    }
  };
};

export const shoppingRetrieveData = data => {
  return {
    type: actionTypes.SHOPPING_RETRIEVE_DATA,
    payload: {
      data
    }
  };
};

export const shoppingLoadEarlierData = (subjectID, chatID, data) => ({
  type: actionTypes.SHOPPING_LOAD_EARLIER,
  payload: {
    subjectID,
    chatID,
    data
  }
});

export const shoppingContactUser = (item, chatID) => ({
  type: actionTypes.SHOPPING_CONTACT_USER,
  payload: {
    item,
    chatID
  }
});

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

export const shoppingRequestContact = (subjectID, chatID, itemID) => {
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

const shoppingRetrySend = ({ subjectID, chatID, msg }) => {
  return dispatch => {
    //API
    setTimeout(() => {
      dispatch(
        shoppingConfirmMsg(subjectID, chatID, msg._id, {
          //Just for testing | replace with API results
          isSending: false,
          _id: uuid.v4()
        })
      );
      //shoppingQueue.splice(0, 1);
      //dispatch(shoppingRetrySend());
    }, 1000);
  };
};

export const onNewShoppingMsg = (subjectID, chatID, msg) => {
  return (dispatch, getState) => {
    dispatch(shoppingReceiveMsg(subjectID, chatID, msg));
    if (getState().shopping.chatFocus === chatID) {
      //Send API for read
    }
  };
};

export const shoppingRetrieve = () => {
  return dispatch => {
    dispatch(shoppingStartGlobalAction());
    //API
    setTimeout(() => {
      dispatch(shoppingRetrieveData(buyerChatList));
    }, 2000);
  };
};

export const shoppingLoadEarlier = (subjectID, chatID) => {
  return dispatch => {
    dispatch(shoppingStartAction(subjectID, chatID));
    //API
    setTimeout(() => {
      dispatch(shoppingLoadEarlierData(subjectID, chatID, loadMockNew()));
    }, 2000);
  };
};

export const shoppingContact = item => {
  return dispatch => {
    const chatID = uuid.v4();
    /*protectedAction()
      .then(() => {
        dispatch(shoppingContactUser(item, chatID));
        NavigationService.navigate("ShoppingChat", {
          chatID,
          subjectID: item.book.subject._id
        });
      })
      .catch(() => null);*/
    dispatch(shoppingContactUser(item, chatID));
    /*NavigationService.navigate("ShoppingChat", {
      chatID,
      subjectID: item.book.subject._id
    });*/
  };
};

export const shoppingRestart = data => {
  return dispatch => {
    while (shoppingQueue.length !== 0) {
      const item = shoppingQueue.shift();
      dispatch(shoppingRetrySend(item));
    }

    dispatch(shoppingStartGlobalAction());

    setTimeout(() => {
      dispatch(shoppingRetrieveData(data));
    }, 2000);
  };
};
