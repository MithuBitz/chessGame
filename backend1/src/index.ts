import { WebSocketServer } from "ws";
import { GameManager } from "./GameManeger";

const wss = new WebSocketServer({ port: 8080 });

const gameManeger = new GameManager();

wss.on("connection", function connection(ws) {
  //add the socket as a user
  gameManeger.addUser(ws);

  ws.on("disconnect", () => gameManeger.removeUser(ws));
});
