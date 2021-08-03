import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Room } from './model/room';
import { GameType } from './model/game';
import { User } from './model/user';
import * as socket_io from 'socket.io';

export class MyServer extends Server {

    private readonly SERVER_START_MSG = "Demo server started on port:";
    private __users : Map<string,string> = new Map<string,string>();
    private __rooms: Map<string, Room> = new Map<string, Room>();
    private __io: socket_io.Server;

    constructor(port: number) {
        super();
        const server = this.app.listen(port, () => {
            Logger.Imp(this.SERVER_START_MSG + port);
        });
        this.__io = new socket_io.Server(server);
        this.__setupHandlers()
    }

    public __setupHandlers(): void {
        this.__io.on("connection", (socket) => {
          console.log(socket.id + " connected");
          socket.on("Login.join", (args: {name: string, room: string}) => {
            this.__join(socket, args.name, args.room);
          });
        });
    }

    private __join(socket: socket_io.Socket, name: string, roomId: string) {
      let room = this.__rooms.get(roomId);
      if (!room) {
        room = new Room(roomId, GameType.GuessDrawing);
        this.__rooms.set(roomId, room);
      }

      let userNames = room.users.map((user: User) => {
        return user.name;
      })

      if (userNames.includes(name)) {
        this.__io.to(socket.id).emit("Login.duplicateName");
        return;
      }
      room.users.push({id: socket.id, name: name});
      userNames.push(name);
      this.__users.set(socket.id, name);


      socket.join(roomId);
      this.__io.to(socket.id).emit('App.joined');
      this.__io.to(roomId).emit('UserList.update', userNames);
      console.log(name + " (" + socket.id + ") joined room " + roomId);
    };
}
