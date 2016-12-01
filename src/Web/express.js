var express = require("express");
var bodyparser = require("body-parser");
var request = require("request");
var firebase = require("firebase");
var util = require("util");
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
    
        var ref = db.ref("testvragen/Lessen/");
        ref.once("value", function(snapshot) {
        res.json(snapshot.val());

        
   //console.log(snapshot.val());
        });
  
});
    
app.get("/firebase/StartLes",function(req,res, body){
        var ref = db.ref("ID_LEERKRACHT");
        ref.once("value", function(snapshot) {
        res.json(snapshot.val());
            
            req.body= snapshot.val()           
            
        });
    
        
    
});   

app.get("/testGraph",function(req,res, body){
        var ref = db.ref("ID_LEERKRACHT");
        ref.once("value", function(snapshot) {
        res.json(snapshot.val());
            
            req.body= snapshot.val()           
            
        });
    
        
    
});   
    
    
app.post('/firebase/post', function (req, res, body) {

    
    /*Test het object in de NODE.js console voordat het binnen komt.
    for(i=0; i< req.body.length; i++)
    {
   console.log(util.inspect(req.body[i], false, null));
    }*/

    var klas = req.body[0];
    var vak = req.body[1];
    var vragen =[];

    for(i=2; i<req.body.length; i++){
      vragen.push(req.body[i]);
    }
          
    var ref = db.ref("/");
    

    
   /* ref.child("ID_LEERKRACHT/klas/" + klas.klas).set({
        klasnaam:klas
        });    */ 
   /* ref.child("ID_LEERKRACHT/klas/" + klas.klas + "/vak" ).set({
        vaknaam:vak
        });*/

      ref.child("ID_LEERKRACHT/klas/" + klas.klas +"/vak/" + vak.vak).set({
        vragen: vragen
        });   
    
                     
    res.sendStatus(201);   
    
  
});


/*app.post('/firebase/post/user', function (req, res, body) {
    
       var ref = db.ref("/");
       var usersRef = ref.child("testvragen");
    
            usersRef.set({
                        "Lessen": {
                          "Geschiedenis": {
                            "vraag 1": {
                              "Antwoorden": "15:00",
                              "Vraag": "hoe laat is het ?",
                              "kindja": 5,
                              "kindnee": 4
                            },
                            "vraag 2": {
                              "Antwoord": "donderdag",
                              "Vraag": "welke dag is het vandaag ? "
                            }
                          },
                          "GeselecteerdeLes": "Geschiedenis"
                        },
                        "UserInfo": {
                          "Birthday": "01-08-1992",
                          "E-mail": "Mohamed_2140_1@hotmail.com",
                          "Gsm": "+32486510922",
                          "Name": "Mohamed El Aissati"
                        }
                      
                });
    
    console.log(req);
    console.log(body);

    res.send(201);       
    
  
});


*/


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
