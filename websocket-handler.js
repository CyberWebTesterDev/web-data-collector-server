const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { path: "/test" }).listen(server);

io.origins("*:*");

server.listen(8335);
//2
const socket = io.listen(server);

const users = [];
const connections = [];

const getUniqueId = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x100000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

io.sockets.on("connection", (socket) => {
  console.log(`WS: Got new connection ${socket.id}`);
  //console.log(socket);
  connections.push(socket);

  socket.on("disconnect", (data) => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`WS: Disconnected connection ${socket.id}`);
  });
});
