//-----------------------------------------------------------Import dependencies and intialing variables
const express = require("express");
const http= require("http");
// const https= require("https");

//Create Express App Object
const app = express();
// Initialize port variable
const portHttp = process.env.PORT || "5000";
// const portHttps = process.env.PORT || "8000";


//-----------------------------------------------------------Routes
app.get("/", (req, res) => {
  res.send("Chaal Gi App");
});



//-----------------------------------------------------------Start the backend server
http.createServer(app).listen(portHttp, () => {
  console.log(`Http App started on the port: ${portHttp}`);
});

// https.createServer({}, app).listen(portHttps, () => {
//     console.log(`Https App started on the port: ${portHttps}`);
//   });
