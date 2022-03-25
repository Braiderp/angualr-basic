const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");

const index = require("./server/routes/index");
const tasks = require("./server/routes/tasks");

const port = 3000;

const app = express();
require("dotenv").config();

// Set Static Folder
app.use(express.static(path.join(__dirname, "clent")));
// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/", index);
app.use("/api", tasks);

const connection = `mongodb+srv://braidenp:${process.env.DB_PASSWORD}@web-development-2.cglha.mongodb.net/task?authSource=admin&replicaSet=atlas-spj3mw-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`;
console.log(connection);
mongoose.connect(connection, { useNewUrlParser: true }, (err, res) => {
  if (err) {
    console.log("Connection failed: " + err);
  } else {
    console.log("Connected to database!");
  }
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
