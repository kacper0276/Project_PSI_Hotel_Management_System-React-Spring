import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
  constructor() {
    this.client = null;
    this.subscriptions = new Map();
  }

  connect() {
    const socket = new SockJS("http://localhost:8080/ws");
    this.client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected to WebSocket");
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    this.client.activate();
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    }
  }

  subscribe(topic, callback) {
    if (!this.client) {
      console.error("WebSocket is not connected.");
      return;
    }

    const subscription = this.client.subscribe(topic, (message) => {
      callback(JSON.parse(message.body));
    });

    this.subscriptions.set(topic, subscription);
  }

  unsubscribe(topic) {
    if (this.subscriptions.has(topic)) {
      const subscription = this.subscriptions.get(topic);
      subscription.unsubscribe();
      this.subscriptions.delete(topic);
    }
  }

  sendMessage(destination, message) {
    if (!this.client) {
      console.error("WebSocket is not connected.");
      return;
    }

    this.client.publish({
      destination: destination,
      body: JSON.stringify(message),
    });
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
