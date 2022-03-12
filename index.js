
const express= require("express");//remember to install express(npm i express)
const bodyParser = require("body-parser");//remember to install body-parser (npm i body-parser)
const request = require("request");//remember to install request(npm i request)

const app= express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/simulate.html");

});
app.listen(process.env.PORT||3000,function(){
  console.log("server is running");
});
// app.post("/index.html", function(req,res){
//   res.sendFile(__dirname+"/simulate.html");
//
// });
