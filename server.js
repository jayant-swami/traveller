//-----------------------------------------------------------Import dependencies and intialing variables
const express = require("express");
const http= require("http");
const mongoose= require("mongoose");
const config=require("./config/config")
// const https= require("https");

//--Create Express App Object
const app = express();
//--Initialize port variable

//-----------------------------------------------------------Connecting DB

mongoose
  .connect(config.db.mongoUrl, config.db.connectOptions)
  .then(() => console.log("Db Connected"))
  .catch(err => console.log("Db connection Failed: ", err));


//-----------------------------------------------------------Routes
app.get("/", (req, res) => {
  res.send("Chaal Gi App");
});


//-----------------------------------------------------------Start the backend server
http.createServer(app).listen(config.app.port, () => {
  console.log(`Http App started on the port: ${config.app.port}`);
});

// https.createServer({}, app).listen(portHttps, () => {
//     console.log(`Https App started on the port: ${portHttps}`);
//   });
