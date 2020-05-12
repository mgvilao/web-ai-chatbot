// instantiate express and set the app to look for the html and css source files
// set the app to listen to the server on port 5000
// set index.html as home
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

const server = app.listen(5000);
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
