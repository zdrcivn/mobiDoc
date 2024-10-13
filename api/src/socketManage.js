module.exports = (io) => (socket) => {
  //console.log("Made a connection", socket.id);

  socket.on("chatMessage", (message) => {
    console.log(message);
    io.emit("incomingMessage", message);
  });

  socket.on("disconnected", () => {
    console.log("disconnected");
    io.emit("User disconnected", socket.user.id);
  });
};
