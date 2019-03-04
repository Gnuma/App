import firebase from "react-native-firebase";
import * as actionTypes from "./actionTypes";
import { mockChatLink, mockMessages } from "../../mockData/Chat";

const isOffline = true;

export const msgConnect = (unsubscriber, type) => {
  return {
    type: actionTypes.MSG_CONNECT,
    payload: {
      unsubscriber,
      type
    }
  };
};
/*
export const msgListenToChats = (chatRef, type) => {
  return {
    type: actionTypes.MSG_LISTENTOCHATS,
    payload: {
      chatRef,
      type
    }
  };
};
*/

export const msgChatUpdate = (chatID, chatData, type) => {
  return {
    type: actionTypes.MSG_CHATUPDATE,
    payload: {
      chatID,
      chatData,
      type
    }
  };
};

export const msgMessagesUpdate = (chatID, messages) => {
  return {
    type: actionTypes.MSG_MESSAGESUPDATE,
    payload: {
      chatID,
      messages
    }
  };
};

export const msgDisconnect = () => {
  return {
    type: actionTypes.MSG_DISCONNECT,
    payload: {}
  };
};

export const msgFail = error => {
  return {
    type: actionTypes.MSG_FAIL,
    payload: {
      error
    }
  };
};

export const msgSend = (content, chatID) => {};

const _subscribeChats = (ref, type, dispatch) => {
  ref.onSnapshot(chatsSnapshot => {
    chatsSnapshot.forEach(chat =>
      dispatch(msgChatUpdate(chat.id, chat.data(), type))
    );
  });
};

const _subscribeMessages = (ref, dispatch) => {
  ref.get().then(chatsSnapshot => {
    chatsSnapshot.forEach(chatDoc => {
      const users = {
        buyer: chatDoc.data().buyer,
        seller: chatDoc.data().seller
      };
      chatDoc.ref
        .collection("messages")
        .orderBy("timestamp", "ASC")
        .onSnapshot(messagesSnapshot => {
          let messages = [];
          messagesSnapshot.forEach(newMessage => {
            messages.unshift(parseMessage(newMessage, users));
          });
          dispatch(msgMessagesUpdate(chatDoc.id, messages));
        });
    });
  });
};

export const connect = userID => {
  return dispatch => {
    if (isOffline) {
      dispatch(msgChatUpdate("AAA", mockChatLink, "buyerChats"));
      dispatch(msgMessagesUpdate("AAA", mockMessages));
    } else {
      const db = firebase.firestore().collection("chats");

      const buyerChatsRef = db.where("buyer.id", "==", userID);
      const sellerChatsRef = db.where("seller.id", "==", userID);

      _subscribeChats(buyerChatsRef, "buyerChats", dispatch);
      _subscribeChats(sellerChatsRef, "sellerChats", dispatch);
      //dispatch(msgConnect(c_buyerUnsubscriber.toString(), "buyerChats"));
      //dispatch(msgConnect(c_sellerUnsubscriber.toString(), "sellerChats"));
      _subscribeMessages(buyerChatsRef, dispatch);
      _subscribeMessages(sellerChatsRef, dispatch);
    }
  };
};

const onNewChats = (query, type, dispatch) => {};

const parseMessage = (snapshot, users) => {
  const { timestamp: strTimestamp, content, sender } = snapshot.data();
  const { id: _id } = snapshot;
  const timestamp = new Date(strTimestamp);
  return {
    _id,
    createdAt: timestamp,
    text: content,
    user: {
      _id: users[sender].id,
      name: users[sender].name
    }
  };
};

/*
    buyerChatsRef.onSnapshot(chats => {
      //dispatch(updateChats(chat, "buyer"));
      console.log("Updading Chats => " + chats.size);
      chats.forEach(chat => {
        console.log("Updating Chat => " + chat.id);
        chat.ref
          .collection("messages")
          .limit(10)
          .onSnapshot(messages => {
            console.log("Updating Messages => " + messages.size);
            messages.forEach(message => console.log(message.data()));
          });
      });
    });
    
    buyerChatsRef.get().then(chats => {
      chats.forEach(chat => {
        chat.ref
          .collection("messages")
          .orderBy("date", "desc")
          .limit(5)
          .get()
          .then(messagesRefs => {
            messagesRefs.forEach(message => console.log(message.data()));
          });
      });
    });
    */
//sellerChatsRef.onSnapshot(chats => {
//dispatch(updateChats(chat, "seller"));
//  chats.forEach(chat => console.log(chat.data()));
//});

/*
  query.get().then(chats => {
    chats.forEach(chat => {
      chat.ref
        .collection("messages")
        .orderBy("date", "desc")
        .limit(5)
        .get()
        .then(messagesRefs => {
          let initialMessages = [];
          messagesRefs.forEach(msgSnapshot => {
            initialMessages.unshift(parseMessage(msgSnapshot));
          });
          return initialMessages;
        })
        .finally(initialMessages => {
          dispatch(msgAddChat(chat.id, chat.data(), initialMessages, type));
        });
    });
  });
  */

/*
    return {
    type: actionTypes.MSG_ADDCHAT,
    payload: {
      chatID,
      chatData,
      initialMessages,
      type
    }
  };
  */

//newChat(buyerChatsRef, "buyer", dispatch);
//newChat(sellerChatsRef, "seller", dispatch);

//dispatch(msgConnect(buyerUnsubscriber, "buyerChats"));

/*
    const sellerUnsubscriber = sellerChatsRef.onSnapshot(chatsSnapshot => {
      chatsSnapshot.forEach(chat =>
        dispatch(msgChatUpdate(chat.id, chat.data(), "sellerChats"))
      );
    });
    //dispatch(msgConnect(sellerUnsubscriber, "sellerChats"));
*/
