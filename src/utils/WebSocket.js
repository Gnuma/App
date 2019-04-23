import { ___WS_ENDPOINT___ } from "../store/constants";

export default class WS {
  ws = null;
  online = false;

  static init() {
    this.ws = new WebSocket(___WS_ENDPOINT___);
    this.ws.onopen = this.onOpen;
    this.ws.onerror = this.onError;
  }
  static onMessage(handler) {
    this.ws.addEventListener("message", handler);
  }
  static sendMessage(message) {
    this.ws.send(message);
  }

  static onOpen = () => {
    this.online = true;
  };

  static onClose = () => {
    this.online = false;
    //Try reconnecting
    this.init();
  };

  static onError = err => {
    console.warn(err);
  };
}
