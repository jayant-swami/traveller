//-----------------------------------------------------------Import dependencies and intialing variables
const express = require("express");
const http= require("http");
const mongoose= require("mongoose");
const config=require("./config/config");
const usersRouter=require("./routes/api/usersRouter");
const authRouter=require("./routes/api/authRouter");
const profileRouter=require("./routes/api/profileRouter");
const postsRouter=require("./routes/api/postsRouter");
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
app.use(express.json());
app.use("/api/users",usersRouter);
app.use("/api/auth",authRouter);
app.use("/api/posts",postsRouter);
app.use("/api/profile",profileRouter);



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
