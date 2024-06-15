import { WebSocket } from "ws";
import { INIT_GAME } from "./message";

//Create a Game manager class to create a game when two players are connected
export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket;
  private users: WebSocket[];

  constructor() {
    this.games = [];
  }

  //add a user or a player
  addUser(socket: WebSocket) {
    //add the user from socket
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
    //Stop the game here bcoz the player is removed
  }

  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      if (message.type === INIT_GAME) {
        //If the user or player is waiting for the player then
        if (this.pendingUser) {
          //Start the game
        } else {
          //if the user not waiting for next player then
          this.pendingUser = socket;
        }
      }
    });
  }
}
