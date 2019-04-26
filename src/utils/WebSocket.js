import { ___WS_ENDPOINT___, ___WS_TEST_ENDPOINT } from "../store/constants";
//import "./MockWS";
import store from "../store/store";
import {
  onNewSalesMsg,
  salesInit,
  salesRestart,
  salesNewChat
} from "../store/actions/sales";
import { onNewShoppingMsg, shoppingInit } from "../store/actions/shopping";
import update from "immutability-helper";
import { commentList } from "../mockData/comments";
import {
  sellerChatList,
  buyerChatList,
  buyerChatList_DEPRECATED
} from "../mockData/Chat2";
import { commentsReceiveComment } from "../store/actions/comments";
import NetInfo from "@react-native-community/netinfo";
import { AppState } from "react-native";
import { ChatType } from "./constants";
import { restart } from "../store/actions/messaging";

class WS {
  ws = null;
  token = null;

  connectionSubscription = null;
  stateSubscription = null;
  lastAppState = null;
  lastConnectionState = null;

  init(token) {
    console.log("Initiating...");
    this.token = token;
    //CALL API -> then:
    //store.dispatch(shoppingInit(buyerChatList));
    //store.dispatch(salesInit(sellerChatList));
    this.startConnection();

    this.connectionSubscription = NetInfo.isConnected.addEventListener(
      "connectionChange",
      isConnected => {
        console.log(isConnected);
        if (this.lastConnectionState === false) this.restart(isConnected);
        this.lastConnectionState = isConnected;
      }
    );

    this.stateSubscription = AppState.addEventListener("change", appState => {
      console.log(appState);
      if (appState == "active" && this.lastAppState == "background") {
        NetInfo.isConnected
          .fetch()
          .then(isConnected => this.restart(isConnected));
      } else if (appState == "background") {
      }
      this.lastAppState = appState;
    });
  }

  restart = isConnected => {
    if (!isConnected) return;
    this.refresh().then(this.startConnection);
  };

  refresh = () => {
    return new Promise(function(resolve, reject) {
      //store.dispatch(commentsInit(commentList));
      store.dispatch(restart(resolve));
    });
  };

  onMessage = msg => {
    try {
      const data = JSON.parse(msg.data);
      console.log(data);
      switch (data.type) {
        case DataType.NEW_CHAT:
          return store.dispatch(
            salesNewChat(data.chat.item._id, data.chat.pk, data.chat)
          );

        case DataType.NEW_MESSAGE:
          const msg = formatMsg(data.msg);
          if (data.for === ChatType.sales)
            return store.dispatch(
              onNewSalesMsg(msg.itemID, msg.chatID, msg.msg)
            );
          else
            return store.dispatch(
              onNewShoppingMsg(msg.subjectID, msg.chatID, msg.msg)
            );

        case DataType.NEW_COMMENT:
          return store.dispatch(commentsReceiveComment(data.comment, data.for));

        default:
          throw `Type ${data.type} not valid`;
      }
    } catch (error) {
      console.warn(error);
    }
  };

  startConnection = () => {
    console.log("Connecting to WS Server...");
    //this.ws = new WebSocket(___WS_TEST_ENDPOINT);
    try {
      //this.ws = new WebSocket(___WS_ENDPOINT___ + "?token=" + this.token);
      this.ws = new WebSocket(___WS_TEST_ENDPOINT);
      this.ws.onopen = this.onOpen;
      this.ws.onclose = this.onClose;
      this.ws.onerror = this.onError;
      this.ws.onmessage = this.onMessage;
    } catch (error) {}
  };

  sendMessage(message) {
    this.ws.send(message);
  }

  onOpen = () => {
    console.log("Connected");
  };

  onClose = () => {
    console.log("Closing");
  };

  onError = err => {
    console.warn(err);
  };
}

const DataType = {
  NEW_MESSAGE: "newMessage",
  NEW_CHAT: "newChat",
  NEW_COMMENT: "newComment",
  NEW_ANSWER: "newAnswer"
};

formatMsg = msg => {
  return update(msg, {
    msg: {
      createdAt: {
        $apply: dateStr => new Date(dateStr)
      }
    }
  });
};

export default new WS();
