const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log(req.body.cityName);

  const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=187d0c51e421b551906b5c5b002dafce&units=metric"

  https.get(url, function(response) {
    console.log(response);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;

      res.write("<h1>The temperature is " + temp+" degree Celcius.</h1>");
      res.send()
    });
  });

});

app.listen(3000, function() {
  console.log("welcome to port 3000");
});
