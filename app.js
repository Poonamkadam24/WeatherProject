const express = require("express");
const https = require("https");
const bodyParse=require("body-parser");

const app = express();
app.use(bodyParse.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");

});
app.post("/",function(req,res){
//  console.log(req.body.cityName);
  //console.log("Post request received");

  const query =req.body.cityName;
  const apiKey= "53a7d45481b7aa53a6079b455478be9c";
  const unit = "metric";
  const url=  "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      // console.log(data);
      const weatherData=JSON.parse(data)
      const temp= weatherData.main.temp
      const weatherDiscription= weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL="http://openweathermap.org/img/wn/"+icon+ "@2x.png"
      res.write("<p>The weather is currently "+weatherDiscription+"<p>");
      res.write("<h1>The temperature in" +query+" is "+temp+" degrees Celcius.</h1>");
      res.write("<img src=" +imageURL +">");
      res.send();
})

})

})










app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
