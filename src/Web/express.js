var express = require("express");
var bodyparser = require("body-parser");
var request = require("request");
var firebase = require("firebase");

  var config = {
    apiKey: " AIzaSyC6i50thhMC2xEMQSCe8Te8hfPGC2uvyDQ",
    authDomain: "percipience-ace91.firebaseapp.com",
    databaseURL: "percipience-ace91.firebaseio.com/"
  };
  firebase.initializeApp(config);
var app = express();
app.use(bodyparser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");
	next();
});


// Initialize the app with no authentication
firebase.initializeApp({
  databaseURL: "https://percipience-ace91.firebaseio.com"
});

// The app only has access to public data as defined in the Security Rules
var db = firebase.database();


// Load Index.html
var path = require("path");
app.use(express.static(__dirname + "/"));

app.get("/", function(req,res){
	res.sendFile( __dirname + "/" + "index.html");
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//----->>// REST API //<---------//


// Get request for  all data
app.get("/firebase",function(req,res, body){
    
        var ref = db.ref("/");
        ref.once("value", function(snapshot) {
        res.json(snapshot.val());
        });
    
});


app.post('/firebase/post', function (req, res, body) {
    
        var ref = db.ref("/");
        var usersRef = ref.child("ID3");
    
            usersRef.set({
              alanisawesome: {
                date_of_birth: req.body.Birthday,
                full_name: req.body.Name
              },
              gracehop: {
                date_of_birth: "December 9, 1906",
                full_name: "Grace Hopper"
              }
            });

    res.send(201);       
    
  
});





app.put('/firebase/put', function (req, res, body) {
    
    
        var ref = db.ref("/");
        var usersRef = ref.child("ID3");
        var hopperRef = usersRef.child("alanisawesome");
    
            hopperRef.update({
              "nickname": req.body.Name
            });

     res.send(201);       

});


app.delete('/firebase/delete', function (req, res, body) {
    
    
        var ref = db.ref("/" + req.body.link);
        
        ref.remove();

     res.send(201);       

});


app.listen(3000);
