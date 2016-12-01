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
            .when('/viewGraph', {
                title: 'viewGraph',
                templateUrl: 'view/makingGraph/graphTest.html',
                controller: 'graphTestCtrl',
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

	   	if($q[i].question != '' && $q[i].answer != '')
	   	{
	   		summaryService.addQuestions($q)
			$location.path("/createLessonSummary");
		};

	   	if($q[i].question == '' || $q[i].answer == '')
	   	{
			alert("Voer alle vragen in en/of verwijder de niet ingevulde vragen.");
		};
	};
   }

    var counter=1;
    $scope.questionelement = [ {id:counter, question : '', answer : ''} ];

    $scope.newItem = function($event){
        counter++;
        $scope.questionelement.push(  { id:counter, question : '', answer : ''} );
        $event.preventDefault();

    }

});

app.controller("createLessonSummary", function($scope, $http, $location, summaryService){
	$scope.klas = summaryService.getKlas();
	$scope.vak = summaryService.getVak();
	$scope.vraagAntwoord= summaryService.getQuestions();
	$scope.vraag =[];
	$scope.antwoord =[];

	    $scope.data = [ {klas:$scope.klas},
                    {vak:$scope.vak}
                  ];
	for(var i =0; i< $scope.vraagAntwoord.length; i++)
	{
$scope.vraag[i] = $scope.vraagAntwoord[i].question;
$scope.antwoord[i] = $scope.vraagAntwoord[i].answer;

    

                  $scope.data.push(
                  {vraag:$scope.vraag[i], 
                  antwoord:$scope.antwoord[i]}
                  );

              }

              console.log($scope.data);


        $scope.submit=function(){ 
            $http.post("http://localhost:3000/firebase/post", $scope.data )
            .success(function(data){	
              
               console.log("posted successfully");
                //console.log($scope.data);

            })
            .error(function(data){
                console.error("error in posting");
                //console.log($scope.data)
            });
	
        
        }

    
   /* $scope.submit=function(){
		$http.get("http://localhost:3000/firebase")
		.success(function(allejsondata){	
			console.log(allejsondata);
            })
            .error(function(err){

            });
	
        
        }*/

    
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
    var vaknaam= "geschiedenis"
    UserData = DataService.getUserData();
    
    
    for (var prop in UserData.klas[klasnummer].vak) {
                        console.log(prop);
                   //   console.log(UserData.klas[prop].vak.vaknaam)
        //console.log("Value:" + UserData.klas[prop].klasnaam.klas);
                      data.push(prop);
                  console.log(data);
                 };
                
                $scope.datavakken = data;
    
        console.log(data);
    
    console.log(UserData.klas[klasnummer].vak[vaknaam]);
    
    
    $scope.next = function(vak){
    	console.log(vak);
    	DataService.addVak(vak);
    	$location.path("/viewquestion");
    }
});

app.controller("viewquestionCtrl", function($scope, $http, $location, DataService){
    $scope.klas = DataService.getKlas();
	$scope.k = $scope.klas[0];
    $scope.vak = DataService.getKlas();
    $scope.v = $scope.vak[0];

    
     
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
app.controller("graphTestCtrl", function($scope, $http, $location){
var ja;
var nee;


	$scope.getData = function(){
			
	            $http.get("http://localhost:3000/testGraph")
            .success(function(UserData){	
              
var data= [];  
              console.log(UserData.klas[$scope.klasnaam]);
              console.log(UserData.klas[$scope.klasnaam].vak[$scope.vaknaam]);
ja=UserData.klas[$scope.klasnaam].vak[$scope.vaknaam].vragen[1].kindJa;
nee=UserData.klas[$scope.klasnaam].vak[$scope.vaknaam].vragen[1].kindNee;

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
            })
            .error(function(UserData){
                console.error("error in retrieving");
                console.log(UserData)
            });
};
});

//Einde controller graphs