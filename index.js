const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { setTimeout } = require("timers/promises");
/////
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

///////////bước setup server side cho socket.io
const expressServer = http.createServer(app);
const io = new Server(expressServer);
////////////////////////////////////////////////

////////// check server side và client side
// io.on("connection", (socket) => {
//   console.log("New user are in connection");

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });
//////////////////////////////////////////

////////////////// pass data to client side
// io.on("connection", function (socket) {
//   socket.send("me may");
// });
////////////////////////////////////////////

/////////// ví dụ internal send data
// io.on("connection", function (socket) {
//   setInterval(function () {
//     let date = new Date();
//     let time = date.getTime();
//     socket.send(time.toString());
//   }, 2000);
// }); /// setimeout không chạy, nhưng setinterval lại chạy, bó tay
///////////////////////////////////////////////

////////////////// sử dụng emit để tạo 1 name event : MyEvent
// io.on("connection", function (socket) {
//   setInterval(function () {
//     let date = new Date();
//     let time = date.getTime();
//     socket.emit("MyEvent", time.toString());
//   }, 2000);

// });
////////////////////////////////////////////////////

////////////////// nhận data từ client
// io.on("connection", function (socket) {
//   socket.on("message", function (msg) {
//     console.log("DATA from Client :: ", msg);
//   });
// });
////////////////////////////////////////////////////

////////////////// nhận data từ client với custom event
// io.on("connection", function (socket) {
//   socket.on("MyClientEvent", function (msg) {
//     console.log("DATA from Client :: ", msg);
//   });
// });
////////////////////////////////////////////////////

////////////////// hướng dẫn broadcasting
// io.on("connection", function (socket) {
//   io.sockets.emit("MyBroadcast", "hello world");
// });
////////////////////////////////////////////////////

////////////////// hướng dẫn namespace

let buyNsp = io.of("/buy");
buyNsp.on("connection", function (socket) {
  buyNsp.emit("MyEvent", "Hello Namespace Buy Entry");
});

let sellNsp = io.of("/sell");
sellNsp.on("connection", function (socket) {
  sellNsp.emit("MyEvent", "Hello Namespace Sell Entry");
});
////////////////////////////////////////////////////

expressServer.listen(3000, () => {
  console.log("the server is running on 3000");
});
