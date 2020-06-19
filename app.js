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

  const city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=187d0c51e421b551906b5c5b002dafce&units=metric";

  https.get(url, function(response) {
    console.log(response);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description
      res.write(city + "   ")
      res.write("Weather description: " + weatherDescription + "   ")
      res.write("Temperature: " + temp+" °C");
      res.send()
    });
  });

});

app.listen(3000, function() {
  console.log("Server running on port 3000");
});
