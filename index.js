// instantiate express and set the app to look for the html and css source files
// set the app to listen to the server on port 5000
// set index.html as homepage
"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

const server = app.listen(process.env.PORT, () => {
  console.log(
    "Express server listening on port %d in %s mode",
    server.address().port,
    app.settings.env
  );
});

const io = require("socket.io")(server);
io.on("connection", function (socket) {
  console.log("a user connected");
});

const apiai = require("apiai")(APIAI_TOKEN);

// Web UI
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

// user - bot interaction
io.on("connection", function (socket) {
  socket.on("chat message", (text) => {
    console.log("Message: " + text);

    // get a reply from API.ai
    let apiaiReq = apiai.textRequest(text, { sessionId: APIAI_SESSION_ID });

    apiaiReq.on("response", (response) => {
      let aiText = response.result.fulfillment.speech;
      console.log("VilaoBot reply: " + aiText);
      socket.emit("bot reply", aiText);
    });

    apiaiReq.on("error", (error) => {
      console.log(error);
    });

    apiaiReq.end();
  });
});
