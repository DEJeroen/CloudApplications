
var app = angular.module("myapp",['ngRoute', 'ngAnimate']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
              .when('/createLessonKlas', {
                title: 'createLessonKlas',
                templateUrl: 'view/makingLessons/createLessonKlas.html',
                controller: 'createLessonKlasCtrl',
            })
              .when('/createLessonSubject', {
                title: 'createLessonSubject',
                templateUrl: 'view/makingLessons/createLessonSubject.html',
                controller: 'createLessonSubjectCtrl',
            })
              .when('/createLessonQuestions', {
                title: 'createLessonQuestions',
                templateUrl: 'view/makingLessons/createLessonQuestions.html',
                controller: 'createLessonQuestionsCtrl',
            })
              .when('/createLessonSummary', {
                title: 'createLessonSummary',
                templateUrl: 'view/makingLessons/createLessonSummary.html',
                controller: 'createLessonSummary',
            })
              .when('/chooseClass', {
                title: 'chooseClass',
                templateUrl: 'view/startLessons/chooseClass.html',
                controller: 'startLessonClassCtrl',
            })
              .when('/chooseSubject', {
                title: 'chooseSubject',
                templateUrl: 'view/startLessons/chooseSubject.html',
                controller: 'startLessonSubjectCtrl',
            })
              .when('/viewquestion', {
                title: 'viewquestion',
                templateUrl: 'view/startLessons/viewquestion.html',
                controller: 'viewquestionCtrl',
            })
            .when('/chooseClassGraph', {
                title: 'chooseClassGraph',
                templateUrl: 'view/makingGraph/chooseClassGraph.html',
                controller: 'graphClassCtrl',
            })

            .when('/chooseSubjectGraph', {
                title: 'chooseSubjectGraph',
                templateUrl: 'view/makingGraph/chooseSubjectGraph.html',
                controller: 'graphSubjectCtrl',
            })

            .when('/viewGraph', {
                title: 'viewGraph',
                templateUrl: 'view/makingGraph/viewGraph.html',
                controller: 'viewGraphCtrl',
            })
                                .otherwise({
                redirectTo: '/createLessonKlas'
            });
    }]);


//1
//Controllers voor lessen maken
app.controller("createLessonKlasCtrl", function($scope, $http, $location, summaryService){
   $scope.nextPageKlas = function($klas){
   	if ($klas != null) {
   	summaryService.addKlas($klas);
		$location.path("/createLessonSubject");
	}

   }
});
app.controller("createLessonSubjectCtrl", function($scope, $http, $location, summaryService){
	$scope.klas = summaryService.getKlas();
	console.log($scope.klas);
   $scope.nextPageSubject = function($vak){
   	if($vak != null){
   	summaryService.addVak($vak);
		$location.path("/createLessonQuestions");
	};
   }
});

app.controller("createLessonQuestionsCtrl", function($scope, $http, $location, summaryService){
	   		$scope.klas = summaryService.getKlas();
	$scope.vak = summaryService.getVak();

   $scope.nextPageQuestions= function($q) {

   	for (var i = 0;  i < $q.length; i++) 
   	{

	   	if($q[i].question != '' && $q[i].answerA != '' && $q[i].answerB != '' || $q[i].answerC != '' || $q[i].answerD != '')
	   	{
	   		summaryService.addQuestions($q)
			$location.path("/createLessonSummary");
		};

	   /*	if($q[i].question == '' || $q[i].answerA == '')
	   	{
			alert("Voer alle vragen in en/of verwijder de niet ingevulde vragen.");
		};*/
	};
   }

    var counter=1;
    $scope.questionelement = [ {id:counter, question : '', answer1 : '' , answer2 : '' , answer3 : '' , answer4 : ''} ];

    $scope.newItem = function($event){
        counter++;
        $scope.questionelement.push(  { id:counter, question : '', answer1 : '' , answer2 : '' , answer3 : '' , answer4 : ''} );
        $event.preventDefault();

    }

});

app.controller("createLessonSummary", function($scope, $http, $location, summaryService){
	$scope.klas = summaryService.getKlas();
	$scope.vak = summaryService.getVak();
	$scope.vraagAntwoord= summaryService.getQuestions();
	 
    
	    $scope.data = [ {klas:$scope.klas},
                    {vak:$scope.vak}
                  ];
    
    console.log($scope.vraagAntwoord);
    
	for(var i =0; i< $scope.vraagAntwoord.length; i++)
	{
        $scope.vraag = $scope.vraagAntwoord[i].question;
        $scope.antwoordA = $scope.vraagAntwoord[i].answer1;
        $scope.antwoordB = $scope.vraagAntwoord[i].answer2;
        $scope.antwoordC = $scope.vraagAntwoord[i].answer3;
        $scope.antwoordD = $scope.vraagAntwoord[i].answer4;

                  $scope.data.push(
                  {vraag:$scope.vraag, A:$scope.antwoordA, B:$scope.antwoordB , C:$scope.antwoordC, D:$scope.antwoordD}
                  );

              }

              console.log($scope.data);

    
        $scope.submit=function(){ 
            $http.post("http://localhost:3000/firebase/post", $scope.data )
            .success(function(data){	
              
               console.log("posted successfully");
               alert("U vragen zijn opgeslagen");
               $location.path("/createLessonKlas");

            })
            .error(function(data){
                console.error("error in posting");
                //console.log($scope.data)
            });
	
        
        }


    
	});

//Service voor databinding, deze service word geïnjecteerd bij alle controllers.
app.service('summaryService', function() {
  var klas;
  var vak;
  var questions = [];

  var addKlas = function(newObj) {
      klas = newObj;  };
  var addVak = function(newObj) {
      vak = newObj;  };
  var addQuestions = function(newObj) {
  	questions = newObj; }

  var getKlas = function(){
      return klas;
  };
    var getVak = function(){
      return vak;
  };

  var getQuestions = function(){
  	return questions;
  }

  return {
    addKlas: addKlas,
    addVak: addVak,
    addQuestions : addQuestions,
    getKlas: getKlas,
    getVak: getVak,
    getQuestions: getQuestions

  };

});
//Eind van controllers voor lessen maken

//Controllers voor starten van de lessen
app.controller("startLessonClassCtrl", function($scope, $http, $location, DataService){
         
 $http.get("http://localhost:3000/firebase/StartLes")
            .success(function(UserData){	
            
                
              
           
             var data= [];  
               console.log("successfully retrieved user date");
               console.log(UserData.klas);
               DataService.adduserData(UserData);
              // var size = Object.keys(UserData.klas).length;
              //        console.log(size);
                
              for (var prop in UserData.klas) {
                        console.log(prop);
                   //   console.log(UserData.klas[prop].vak.vaknaam)
        //console.log("Value:" + UserData.klas[prop].klasnaam.klas);
                      data.push(prop);
                  console.log(data);
                 };
                
                $scope.dataklassen = data;   
            
                         
            })
            .error(function(UserData){
                console.error("error in retrieving");
                console.log(UserData)
            });

                  
        
	
     
    $scope.next = function(klas){
    	console.log(klas);
    	DataService.addKlas(klas);
    	$location.path("/chooseSubject");
    }


	});
app.controller("startLessonSubjectCtrl", function($scope, $http, $location, DataService){
	$scope.klas = DataService.getKlas();
	$scope.k = $scope.klas[0];
    
    var klasnummer = $scope.klas;
    var data= [];
   // var vaknaam= "geschiedenis"
    UserData = DataService.getUserData();
    
    
    for (var prop in UserData.klas[klasnummer].vak) {
                        console.log(prop);
                   //   console.log(UserData.klas[prop].vak.vaknaam)
        //console.log("Value:" + UserData.klas[prop].klasnaam.klas);
                      data.push(prop);
                  console.log(data);
                 };
                
                $scope.datavakken = data;
    
          
  //  console.log(UserData.klas[klasnummer].vak[vaknaam]);
    
    
    $scope.next = function(vak){
    	console.log(vak);
    	DataService.addVak(vak);
    	$location.path("/viewquestion");
    }
});

app.controller("viewquestionCtrl", function($scope, $http, $location, DataService, $interval){
    $scope.klas = DataService.getKlas();
	$scope.k = $scope.klas[0];
    $scope.vak = DataService.getVak();
    $scope.q = 0;
    $scope.currentAnswers =0;
    UserData = DataService.getUserData();
    
    var klasnummer = $scope.klas;
    var vaknaam = $scope.vak;
    var vraagnummer = 1;
    var data= [];
    var laatstevraag;
    var a;
    var b;  
    var c;
    var d; 
    var Optie;
      
     var size = Object.keys(UserData.klas[klasnummer].vak[vaknaam].vragen).length;
    
  /* for (var prop in UserData.klas[klasnummer].vak[vaknaam].vragen) {
                        console.log(prop);
                   //   console.log(UserData.klas[prop].vak.vaknaam)
        //console.log("Value:" + UserData.klas[prop].klasnaam.klas);
                      data.push(prop);
                  console.log(data);
                 };
                
                $scope.datavakken = data;
    */
    
     laatstevraag = size-1;
    
          	for(var i =0; i< size; i++)
	           {

                  data.push(
                  {vraag: UserData.klas[klasnummer].vak[vaknaam].vragen[i].vraag, 
                  antwoord: UserData.klas[klasnummer].vak[vaknaam].vragen[i].antwoord,
                  A: UserData.klas[klasnummer].vak[vaknaam].vragen[i].resultaatA,
                  B: UserData.klas[klasnummer].vak[vaknaam].vragen[i].resultaatB,
                  C: UserData.klas[klasnummer].vak[vaknaam].vragen[i].resultaatC,
                  D: UserData.klas[klasnummer].vak[vaknaam].vragen[i].resultaatD,
                  Optie: UserData.klas[klasnummer].vak[vaknaam].vragen[i].optie}
                  );

              }
     
    
        $scope.vraag = data[0].vraag;
        $scope.antwoord = data[0].antwoord;
        $scope.welkevraag = "Naar vraag " + (vraagnummer + 1);
        
    
    

            $scope.vraag = data[0].vraag;
            $scope.antwoord = data[0].antwoord;
            a=data[0].resultaatA;
		        b=data[0].resultaatB;
            c=data[0].resultaatC;
            d=data[0].resultaatD;
            Optie=data[0].optie;
            makeGraph();
            console.log(a,b,c,d);
            console.log(Optie);



    $scope.nextquestion = function(){
        
        if ($scope.welkevraag == "Naar resultaten")
        {
            $scope.q = "null";
            $scope.k = "null";
            $scope.v = "null";
            $scope.vak = "null";
            $scope.currentAnswers = "null";
            $interval.cancel(interval);
            $location.path("/viewGraph");
        }
        
        if (vraagnummer == laatstevraag)
        {
            $interval.cancel(interval);
            console.log("einde van de rit");
            $scope.vraag = data[vraagnummer].vraag;
            $scope.antwoord = data[vraagnummer].antwoord;

            $scope.q = vraagnummer;

            vraagnummer = vraagnummer + 1;
        
             
            $scope.welkevraag = "Naar resultaten";
         
            
        }
        
        else
        {
            $scope.vraag = data[vraagnummer].vraag;
            $scope.antwoord = data[vraagnummer].antwoord;

            $scope.q = vraagnummer;
           
            console.log($scope.q);
           
            vraagnummer = vraagnummer + 1;
           
      

            $scope.welkevraag = "Naar vraag " + (vraagnummer + 1);

            a=data[vraagnummer].resultaatA;
            b=data[vraagnummer].resultaatB;
            c=data[vraagnummer].resultaatC;
            d=data[vraagnummer].resultaatD;
   
        }
    };

//Om de grafiek te refreshen.

var interval = $interval(function() {
  console.log("interval");
$http.get("http://localhost:3000/firebase/StartLes")
            .success(function(UserData){  
      a =    UserData.klas[klasnummer].vak[vaknaam].vragen[vraagnummer-1].resultaatA;
      b = UserData.klas[klasnummer].vak[vaknaam].vragen[vraagnummer-1].resultaatB;
      c = UserData.klas[klasnummer].vak[vaknaam].vragen[vraagnummer-1].resultaatC;
      d = UserData.klas[klasnummer].vak[vaknaam].vragen[vraagnummer-1].resultaatD;
      Optie = UserData.klas[klasnummer].vak[vaknaam].vragen[vraagnummer-1].optie;; 
      console.log(Optie);     
if(Optie == 2){
$("#Chart3").hide();
$("#Chart4").hide();   
$("#Chart2").show();      
var ctx = document.getElementById("Chart2");
var Chart2 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Ja", "Nee"],
        datasets: [{
            label: '# of Votes',
            data: [ja, nee],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      responsive: true,
      title: {
            display: true,
            text: 'Lesoverzicht',
            fontSize: 40
        }, 
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}

if(Optie == 3){      
$("#Chart4").hide();   
$("#Chart2").hide(); 
$("#Chart3").show(); 
var ctx = document.getElementById("Chart3");
var Chart3 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["A", "B", "C"],
        datasets: [{
            label: '# of Votes',
            data: [a, b,c],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      responsive: true,
      title: {
            display: true,
            text: 'Lesoverzicht',
            fontSize: 40
        }, 
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}

if(Optie == 4){    
$("#Chart2").hide(); 
$("#Chart3").hide(); 
$("#Chart4").show();        
var ctx = document.getElementById("Chart4");
var Chart4 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["A", "B", "C", "D"],
        datasets: [{
            label: '# of Votes',
            data: [a, b, c, d],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      responsive: true,
      title: {
            display: true,
            text: 'Lesoverzicht',
            fontSize: 40
        }, 
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}  
             
            })
            .error(function(UserData){
                console.error("error in retrieving");
                console.log(UserData)
            });
}, 5000);

//Om de initiele grafiek te tekenen.
function makeGraph() {

$http.get("http://localhost:3000/firebase/StartLes")
            .success(function(UserData){	
      a =    UserData.klas[klasnummer].vak[vaknaam].vragen[vraagnummer-1].resultaatA;
      b = UserData.klas[klasnummer].vak[vaknaam].vragen[vraagnummer-1].resultaatB;
      c = UserData.klas[klasnummer].vak[vaknaam].vragen[vraagnummer-1].resultaatC;
      d = UserData.klas[klasnummer].vak[vaknaam].vragen[vraagnummer-1].resultaatD;
      Optie = UserData.klas[klasnummer].vak[vaknaam].vragen[vraagnummer-1].optie;
console.log(Optie);
if(Optie == 2)
{ 
$("#Chart3").hide();
$("#Chart4").hide(); 
$("#Chart2").show();     
var ctx = document.getElementById("Chart2");
var Chart2 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["A", "B"],
        datasets: [{
            label: '# of Votes',
            data: [a, b],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
    	responsive: true,
    	title: {
            display: true,
            text: 'Lesoverzicht',
            fontSize: 40
        }, 
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
}); 
} 

if( Optie == 3)
{        
$("#Chart4").hide(); 
$("#Chart2").hide();
$("#Chart3").show();  
var ctx = document.getElementById("Chart3");
var Chart3 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["A", "B", "C"],
        datasets: [{
            label: '# of Votes',
            data: [a, b, c],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      responsive: true,
      title: {
            display: true,
            text: 'Lesoverzicht',
            fontSize: 40
        }, 
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
}); 
}

if( Optie == 4)
{ 
$("#Chart2").hide();
$("#Chart3").hide();
$("#Chart4").show();          
var ctx = document.getElementById("Chart4");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["A", "B", "C", "D"],
        datasets: [{
            label: '# of Votes',
            data: [a, b, c, d],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      responsive: true,
      title: {
            display: true,
            text: 'Lesoverzicht',
            fontSize: 40
        }, 
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
}); 
}  
             
            })
            .error(function(UserData){
                console.error("error in retrieving");
                console.log(UserData)
            });
    }                 
    
    
    $scope.appsettings = [$scope.k,$scope.vak,$scope.q, $scope.currentAnswers];
    console.log($scope.v);
          submitAppsettings=function(){ 
            $http.post("http://localhost:3000/firebase/post/initStartLes", $scope.appsettings )
            .success(function(data){	
              
               console.log("posted successfully");
            //console.log($scope.data);

            })
            .error(function(data){
                console.error("error in posting");
                //console.log($scope.data)
            });
	
        
        }
    
    
    
   submitAppsettings(); 
    
    
    $scope.$watch('q', function() {
        $scope.appsettings = [$scope.k,$scope.vak,$scope.q, $scope.currentAnswers];
        submitAppsettings(); 
        console.log("ik heb beweging gezien ");
    });
        
        
    
});

app.service('DataService', function() {
  var userData;
  var klas;
  var vak;
  var questions = [];

 var adduserData = function(newObj) {
     userData = newObj;  };
    
  var addKlas = function(newObj) {
      klas = newObj;  };
  var addVak = function(newObj) {
      vak = newObj;  };
  var addQuestions = function(newObj) {
  	questions = newObj; }
  
  var getUserData = function(){
      return userData;
  };

  var getKlas = function(){
      return klas;
  };
    var getVak = function(){
      return vak;
  };

  var getQuestions = function(){
  	return questions;
  }

  return {
    adduserData: adduserData,
    addKlas: addKlas,
    addVak: addVak,
    addQuestions : addQuestions,
      
    getUserData:getUserData,
    getKlas: getKlas,
    getVak: getVak,
    getQuestions: getQuestions
    

  };
});
//Eind van controllers voor les geven

//Controller voor graphs
app.controller("graphClassCtrl", function($scope, $http, $location, DataService){

 $http.get("http://localhost:3000/firebase/Graph")
            .success(function(UserData){	
            
                
            
           
             var data= [];  
               DataService.adduserData(UserData);
                
              for (var prop in UserData.klas) {
                      data.push(prop);
                 };
                
                $scope.dataklassen = data;
                
             
            
                
             
            })
            .error(function(UserData){
                console.error("error in retrieving");
                console.log(UserData)
            });

                $scope.next = function(klas){
    	DataService.addKlas(klas);
    	$location.path("/chooseSubjectGraph");
    }

});

app.controller("graphSubjectCtrl", function($scope, $http, $location, DataService){

	$scope.k = DataService.getKlas();
	$scope.klas = $scope.k[0];
    
    var klasnummer = $scope.klas;
    var data= [];
    UserData = DataService.getUserData();
    
    
    for (var prop in UserData.klas[klasnummer].vak) {
                      data.push(prop);
                 };
                
                $scope.datavakken = data;
    
    
    $scope.next = function(vak){
    	DataService.addVak(vak);
    	$location.path("/viewGraph");
    }


	
	});

app.controller("viewGraphCtrl", function($scope, $http, $location, DataService){

var ja;
var nee;

	$scope.k = DataService.getKlas();
	$scope.klas = $scope.k[0];
$scope.vak= DataService.getVak();


console.log($scope.vak)

			
	            $http.get("http://localhost:3000/firebase/Graph")
            .success(function(UserData){	
              
var data= [];  
var vragen =[];
 DataService.adduserData(UserData);
                
              for (var prop in UserData.klas) {
                      data.push(prop);
                 };

                 for (var prop in UserData.klas[$scope.klas].vak[$scope.vak].vragen) {
                 	console.log(prop);
                      vragen.push(prop);
                 };
                
                $scope.dataklassen = data;
                $scope.datavragen = vragen;
                
            })
            .error(function(UserData){
                console.error("error in retrieving");
                console.log(UserData)
            });



	                $scope.next = function(klas){
    	console.log(klas);
    	DataService.addKlas(klas);
    	$location.path("/chooseSubjectGraph");
    }

    $scope.view = function(vraag){
ja=UserData.klas[$scope.klas].vak[$scope.vak].vragen[vraag].kindJa;
nee=UserData.klas[$scope.klas].vak[$scope.vak].vragen[vraag].kindNee;

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Ja", "Nee"],
        datasets: [{
            label: '# of Votes',
            data: [ja, nee],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
    	responsive: true,
    	title: {
            display: true,
            text: 'Lesoverzicht',
            fontSize: 40
        }, 
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
    }
});

//Einde controller graphs