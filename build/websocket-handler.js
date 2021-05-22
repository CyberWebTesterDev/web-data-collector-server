var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server, { path: "/test" }).listen(server);
io.origins("*:*");
server.listen(8335);
//2
var socket = io.listen(server);
var users = [];
var connections = [];
var getUniqueId = function () {
    var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x100000)
            .toString(16)
            .substring(1);
    };
    return s4() + s4() + "-" + s4();
};
io.sockets.on("connection", function (socket) {
    console.log("WS: Got new connection " + socket.id);
    //console.log(socket);
    connections.push(socket);
    socket.on("disconnect", function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("WS: Disconnected connection " + socket.id);
    });
});
