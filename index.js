require('dotenv').config();
const express = require("express"); //remember to install express(npm i express)
const bodyParser = require("body-parser"); //remember to install body-parser (npm i body-parser)
const request = require("request"); //remember to install request(npm i request)
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");
const md5 = require("md5");
const {
  isEmpty
} = require('lodash');



//schooool
const {
  BU_Department,
  BU_Course
} = require("./babcock");





var Departments = [...BU_Department];
var Courses = [...BU_Course];

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

var amountOfCourses, num, number;


app.use(session({
  secret: 'our little secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-michael:Test123@cluster0.v9j4t.mongodb.net/gpaDB");
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  name: String



});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password'] });

const User = new mongoose.model("User", userSchema);



// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/secrets"
    // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"

  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile._json.name);
    User.findOrCreate({
      googleId: profile.id,
      name: profile._json.name
    }, function(err, user) {
      return cb(err, user);
    });
  }
));









var error = "";
var name, university, department, course, level, semester;
var Course = [];
var Unit = [];
var gradeSchema = [];
var NoOfCourses;
var score=[];
var GPA;

//saving req in app.post("/simulate")

app.get("/", function(req, res) {
  //  res.sendFile(__dirname+"/index.html");
  res.render("home");

});
app.get("/auth/google",
  passport.authenticate("google", {
    scope: ['profile']
  })
);
app.get("/auth/google/secrets",
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/simulate');
  });
app.get("/authenticate", function(req,res){
  res.render("Authenticate");
});
var username;
app.post("/authenticate",function(req,res){
  username= req.body.email;

});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res) {

  if (req.body.password == req.body.Cpassword) {
    User.register({
      username: req.body.username
    }, req.body.password, function(err, result) {
      if (err) {
        console.log(err);
        res.redirect("/register");

      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/simulate");
        });
      }
    });
  } else {
    res.send("wrong password");
  }
});


app.post("/login", function(req, res) {



  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, function(err) {
    if (err) {
      console.log(err);
      res.send("invalid user");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/simulate");
      });
    }

  })


});
app.get("/simulate", function(req, res) {

  User.find({
    "secret": {
      $ne: null
    }
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {


        res.render("simulate", {
          error: error,
          Department: Departments,
          Course: Courses
        });
      }
      // { usersWithSecrets: foundUser}
    }
  });
});
app.post("/simulate", (req, res) => {

  name = req.body.simulate_name;
  university = req.body.University;
  department = req.body.Department;
  course = req.body.Course;
  level = req.body.Level;
  semester = req.body.Semester;


  if (isEmpty(name) || university === "none" || department === "none" || course === "none" || level === "none" || semester === "none") {
    error = "fill all"
    res.redirect("/simulate");
  } else {
    error = "";



    res.redirect("/process");

  }
});


app.get("/process", function(req, res) {

  if (university === "Babcock University") {
    Babcock();
    res.render("input", {error:error,
      Course: Course,
      Unit: Unit
    });
  }


});
app.post("/process", function(req,res){

});

function Babcock() {



  gradeSchema = [100, 80, 79, 60, 59, 50, 49, 45, 44, 40, 39, 0];


  if (university === "Babcock University") {

    for (var i = 0; i < Departments.length; i++) {

      if (department === "Computer Science") {

        for (var i = 0; i < Courses.length; i++) {
          if (course === "Computer Science") {

            if (level === "100" && semester === "1st") {
              Course = ["PHYS 101", "CHEM 101", "MATH 101 ", "STAT 101 ", "cosc107", "cosc101", "GEDS 107", "GEDS 101", "GEDS 105", "GEDS 131"];
              Unit = [3, 3, 3, 2, 2, 3, 2, 2, 2, 2];

            } else if (level === "100" && semester === "2nd") {
              Course = ["GEDS 112", "GEDS 122", "GEDS 131 ", "GEDS 134", "PHYS 102 ", "MATH 104", "MATH 102", "COSC 112", "COSC 108"];
              Unit = [2, 3, 2, 2, 3, 3, 3, 3, 1];

            } else if (level === "200" && semester === "1st") {
              Course = ["GEDS 205", "GEDS 221", "GEDS 260", "COSC 203", "COSC 205", "MATH 203", "STAT 201", "COSC 209"]
              Unit = [3, 2, 2, 3, 3, 3, 2, 1];


            } else if (level === "200" && semester === "2nd") {
              Course = ["GEDS 200", "GEDS 222", "GEDS 270", "COSC 206", "COSC 212", "COSC 226", "MATH 206", "STAT 202", "COSC 222"];
              Unit = [2, 2, 2, 3, 3, 3, 3, 3, 1];

            } else if (level === "300" && semester === "1st") {



            } else if (level === "300" && semester === "2nd") {

            } else if (level === "400" && semester === "1st") {

            } else if (level === "400" && semester === "2nd") {

            }

            // res.redirect("/input");


              NoOfCourses=Unit.length;





          }



        }



      }


    }

  }
}
// app.get("/input", function(req, res) {
//   console.log("/input");
//   res.render("input", {error: error,
//     Course: Course,
//     Unit: Unit,
//   })
//
// });



app.post("/input",function(req,res){



  var grades=[];
  var points=[];
  var sum=0;
  var Cgpa= req.body.CGPA;


  var Sgrade=[ req.body.grade0,req.body.grade1,req.body.grade2,req.body.grade3,req.body.grade4,req.body.grade5,req.body.grade6,req.body.grade7, req.body.grade8,req.body.grade9,req.body.grade10,req.body.grade11,req.body.grade12,req.body.grade13,req.body.grade14,req.body.grade15];


    for(i=0;i<NoOfCourses;i++)
    {
      var grade= Sgrade[i];

      grade=parseFloat(grade);

      if(grade<=gradeSchema[0] && grade>=gradeSchema[1])
      {
        score.push("A");
      }
      else if (grade<=gradeSchema[2]&& grade>=gradeSchema[3]) {
          score.push("B");
      }
      else if (grade<=gradeSchema[4] && grade>=gradeSchema[5]) {
        score.push("C");
      }
      else if (grade<=gradeSchema[6] && grade>=gradeSchema[7]) {
        score.push("D");
      }
      else if (grade<=gradeSchema[8]&& grade>=gradeSchema[9]) {
        score.push("E");
      }
      else if (grade<=gradeSchema[10]&& grade>=gradeSchema[11]) {
          score.push("F");
      }

    }

    for(i=0;i<NoOfCourses;i++)
    {
      var grade= Sgrade[i];
      grade=parseFloat(grade);

      if(grade<=gradeSchema[0] && grade>=gradeSchema[1])
      {
        grade=5;
      }
      else if (grade<=gradeSchema[2]&& grade>=gradeSchema[3]) {
          grade=4;
      }
      else if (grade<=gradeSchema[4] && grade>=gradeSchema[5]) {
          grade=3;
      }
      else if (grade<=gradeSchema[6] && grade>=gradeSchema[7]) {
          grade=2;
      }
      else if (grade<=gradeSchema[8]&& grade>=gradeSchema[9]) {
        grade=1;
      }
      else if (grade<=gradeSchema[10]&& grade>=gradeSchema[11]) {
          grade=0;
      }
      else{
        grade="mike";
      }
      grades.push(grade);
    }

    for(i=0;i<NoOfCourses;i++)
    {
        var point = grades[i]*Unit[i];
        points.push(point);
    }
    for(i=0;i<NoOfCourses;i++)
    {
      sum+=points[i];

    }
    var tunits=0;
    for(i=0;i<NoOfCourses;i++)
    {
      tunits+=Unit[i];

    }
     GPA = sum/tunits;

  var isfilled=true;
  for(var i=0;i<NoOfCourses;i++){
    if(isEmpty(Sgrade[i])||(Sgrade[i]>100&&Sgrade[i]<0)||isNaN(Sgrade[i]) ){
      isfilled=false;
    }
  }
if(isNaN(GPA) ||isfilled==false ){

    error="fill all input with numbers";
    res.redirect("/process");

    console.log(error);
    console.log(GPA);

}else{

  error="";
  if(isEmpty(Cgpa)){
  GPA= GPA.toFixed(2);
  console.log(GPA);
  res.render("result",{Gpa: GPA,score: score, course:Course,num: NoOfCourses });
  }else{
  Cgpa=parseFloat(Cgpa);
  GPA=(GPA+Cgpa)/2;
  GPA= GPA.toFixed(2);
  console.log(GPA);
  res.render("result",{Gpa: GPA,score: score, course:Course, num: NoOfCourses });
  }
}

// //Your Schema is very easy like below and no need to define _id( MongoDB will automatically create _id in hexadecimal string)
// var personSchema = Schema({
//   name    : String,
//   surname : String,
//   addresses : [{
//     street: String,
//     city: String
//   }]
//
// var addresses= [
//     {street: 'W Division', city: 'Chicago'},
//     {street: 'Beekman', city: 'New York'},
//     {street: 'Florence', city: 'Los Angeles'}
// ];
// //Saving in Schema
// var personData = new personSchema ({
//   name:'peter',
//   surname:'bloom',
//   addresses:addresses
// })
// personData.save();






});
app.listen(process.env.PORT || 3000, function() {
  console.log("server is running");

});
