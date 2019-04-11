import { ___WS_ENDPOINT___ } from "../store/constants";

export default class WS {
  static init() {
    this.ws = new WebSocket(___WS_ENDPOINT___);
    this.ws.onopen = () => {
      this.ws.send("Ciao Test 123");
    };
    this.ws.onerror = err => {
      console.log(err.message);
    };
  }
  static onMessage(handler) {
    this.ws.addEventListener("message", handler);
  }
  static sendMessage(message) {
    this.ws.send(message);
  }
}
