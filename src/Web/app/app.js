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

	    $scope.data = [ {klas:"klas"+$scope.klas},{klasnaam:$scope.klas},
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
              
               $scope.data = UserData;
 

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

	            $http.get("http://localhost:3000/firebase/StartLes")
            .success(function(UserData){	
              
               $scope.data = UserData;
 console.log(UserData.klas.$scope.k);

            })
            .error(function(UserData){
                console.error("error in retrieving");
                console.log(UserData)
            });



           $scope.startLes = function(dataforservice){ 
               console.log($scope.selectedData);
            var dataforservice = $scope.selectedData;
               $location.path("/viewquestion");
               
        DataService.addProduct(dataforservice);
              
               
        }; 
});

app.controller("viewquestionCtrl", function($scope, $http, $location, DataService){
    

    console.log($scope.data);
    
    $scope.viewdata = $scope.data[0].vak;   
});

app.service('DataService', function() {
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
//Eind van controllers voor les geven
app.controller("graphTestCtrl", function($scope, $http, $location){
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 4, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
});