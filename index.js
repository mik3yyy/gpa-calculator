
const express= require("express");//remember to install express(npm i express)
const bodyParser = require("body-parser");//remember to install body-parser (npm i body-parser)
const request = require("request");//remember to install request(npm i request)

const app= express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
  var amountOfCourses,num,number;

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");


});
app.post("/",function(req,res){

  amountOfCourses = req.body.amountOfCourses;
  console.log(amountOfCourses);

  res.sendFile(__dirname+"/simulate.html");
// document.querySelector("h1.result").style.visibility="visible";

});
app.post("/simulate",function(req,res){
  // res.sendFile(__dirname+"/simulate.html");
  number=amountOfCourses;//AMOUNT OF COURSES USER HAS




//number array
  var names=[];
  var grades=[];
  var units=[];
  var points=[];
  var sum=0;
    var score=[];
  var i;
//char array
  var Sname =[req.body.name1,req.body.name2,req.body.name3,req.body.name4,req.body.name5,req.body.name6,req.body.name7,req.body.name8,
  req.body.name9,req.body.name10,req.body.name11,req.body.name12];
  var Sgrade=[ req.body.grade1,req.body.grade2,req.body.grade3,req.body.grade4,req.body.grade5,req.body.grade6,req.body.grade7,
    req.body.grade8,req.body.grade9,req.body.grade10,req.body.grade11,req.body.grade12];
    var Sunit=[ req.body.unit1,req.body.unit2,req.body.unit3,req.body.unit4,req.body.unit5,req.body.unit6,req.body.unit7,req.body.unit8,
    req.body.unit9,req.body.unit10,req.body.unit11,req.body.unit12 ];


    for(i=0;i<number;i++)
    {
      // var name =req.body

       var name =Sname[i];
      names.push( name);
    }
  //grade is aphabet

    for(i=0;i<number;i++)
    {
      var grade= Sgrade[i];
      grade=parseFloat(grade);

      if(grade<=100 && grade>=80)
      {
        score.push("A");
      }
      else if (grade<=79 && grade>=60) {
          score.push("B");
      }
      else if (grade<=59 && grade>=50) {
        score.push("C");
      }
      else if (grade<=49 && grade>=45) {
        score.push("D");
      }
      else if (grade<=44&& grade>=40) {
        score.push("E");
      }
      else if (grade<=39&& grade>=0) {
          score.push("F");
      }

    }
    //stop
    for(i=0;i<number;i++)
    {
      var grade= Sgrade[i];
      grade=parseFloat(grade);

      if(grade<=100 && grade>=80)
      {
        grade=5;
      }
      else if (grade<=79 && grade>=60) {
          grade=4;
      }
      else if (grade<=59 && grade>=50) {
          grade=3;
      }
      else if (grade<=49 && grade>=45) {
          grade=2;
      }
      else if (grade<=44&& grade>=40) {
          grade=1;
      }
      else if (grade<=39&& grade>=0) {
          grade=0;
      }
      grades.push(grade);
    }
    for(i=0;i<number;i++)
    {
      var unit = Sunit[i];
      unit=parseFloat(unit);
      units.push(unit);
    }
    for(i=0;i<number;i++)
    {
        var point = grades[i]*units[i];
        points.push(point);
    }
    for(i=0;i<number;i++)
    {
      sum+=points[i];

    }
    var tunits=0;
    for(i=0;i<number;i++)
    {
      tunits+=units[i];

    }
    var average = sum/tunits;
    // document.querySelector("h1.result").style.visibility="visible";


    
    res.send("GPA ="+average);

});
app.listen(process.env.PORT||3000,function(){
  console.log("server is running");
});
// app.post("/index.html", function(req,res){
//   res.sendFile(__dirname+"/simulate.html");
//
// });
//
// var number;
// $("button.input").click(function(){
//
//   var num=$("input.input").val();
//
// number=num;
//   num=parseInt(num);
//   num-=1;
//   var i=0;
//   while(i<13)
//   {
//     if(i<=num){
//
//       document.querySelectorAll("ul")[i].classList.remove("visibility");
//     }
//
//       if(i>num){
//
//         document.querySelectorAll("ul")[i].classList.add("visibility");
//       }
// i++;
// }
//
// num=00;
// });
//
// // $("button.btns").click(function(){
//   var names=[];
//   var grades=[];
//   var units=[];
//   var points=[];
//   var sum=0;
//   	var score=[];
//
//     for(i=0;i<number;i++)
//     {
//       var name =document.querySelectorAll(".name")[i].value;
//       names.push( name);
//     }
//   //grade is aphabet
//
//     for(i=0;i<number;i++)
//     {
//       var grade= document.querySelectorAll(".grade")[i].value;
//       grade=parseFloat(grade);
//
//       if(grade<=100 && grade>=80)
//       {
//         score.push("A");
//       }
//       else if (grade<=79 && grade>=60) {
//           score.push("B");
//       }
//       else if (grade<=59 && grade>=50) {
//         score.push("C");
//       }
//       else if (grade<=49 && grade>=45) {
//         score.push("D");
//       }
//       else if (grade<=44&& grade>=40) {
//         score.push("E");
//       }
//       else if (grade<=39&& grade>=0) {
//           score.push("F");
//       }
//
//     }
//     //stop
//     for(i=0;i<number;i++)
//     {
//       var grade= document.querySelectorAll(".grade")[i].value;
//       grade=parseFloat(grade);
//
//       if(grade<=100 && grade>=80)
//       {
//         grade=5;
//       }
//       else if (grade<=79 && grade>=60) {
//           grade=4;
//       }
//       else if (grade<=59 && grade>=50) {
//           grade=3;
//       }
//       else if (grade<=49 && grade>=45) {
//           grade=2;
//       }
//       else if (grade<=44&& grade>=40) {
//           grade=1;
//       }
//       else if (grade<=39&& grade>=0) {
//           grade=0;
//       }
//       grades.push(grade);
//     }
//     for(i=0;i<number;i++)
//     {
//       var unit = document.querySelectorAll(".unit")[i].value;
//       unit=parseFloat(unit);
//       units.push(unit);
//     }
//     for(i=0;i<number;i++)
//     {
//         var point = grades[i]*units[i];
//         points.push(point);
//     }
//     for(i=0;i<number;i++)
//     {
//       sum+=points[i];
//
//     }
//     var tunits=0;
//     for(i=0;i<number;i++)
//     {
//       tunits+=units[i];
//
//     }
//     var average = sum/tunits;
  // $("h1.result").css("visibility","visible");
  //
  //
  //   document.querySelectorAll("h1.result")[0].textContent="GPA: "+ average;
//
//      // document.querySelectorAll("h1")[i].classList.remove("result");
//
//   $("p.result").css("visibility","visible");
// for(i=0;i<number;i++)
// {
//
//     document.querySelectorAll("p.result")[i].textContent= names[i]+"|~~~~~~~~~~~~~~~~~~~~~|"+ score[i];
// }     // document.querySelectorAll("h1")[i].classList.remove("result");
//
//
//
//
// });
