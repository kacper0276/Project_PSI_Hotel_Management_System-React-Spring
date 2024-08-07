import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type Callback = (message: any) => void;

class WebSocketService {
  private client: Client | null;
  private subscriptions: Map<string, any>;

  constructor() {
    this.client = null;
    this.subscriptions = new Map<string, any>();
  }

  connect(): void {
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

  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
    }
  }

  subscribe(topic: string, callback: Callback): void {
    if (!this.client) {
      console.error("WebSocket is not connected.");
      return;
    }

    const subscription = this.client.subscribe(topic, (message: IMessage) => {
      callback(JSON.parse(message.body));
    });

    this.subscriptions.set(topic, subscription);
  }

  unsubscribe(topic: string): void {
    if (this.subscriptions.has(topic)) {
      const subscription = this.subscriptions.get(topic);
      subscription.unsubscribe();
      this.subscriptions.delete(topic);
    }
  }

  sendMessage(destination: string, message: any): void {
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
