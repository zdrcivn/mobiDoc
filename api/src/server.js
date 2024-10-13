const express = require("express");
const dotenv = require("dotenv");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);
const socketManage = require("./socketManage")(io);

io.on("connection", socketManage);

const routes = require("./routes");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use((req, res) => {
  res.status(400).send("404: Page Not Found!");
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
