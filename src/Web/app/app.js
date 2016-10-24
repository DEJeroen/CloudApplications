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
              .when('/startLesson', {
                title: 'startLesson',
                templateUrl: 'view/startLessons/startLesson.html',
                controller: 'startLessonCtrl',
            })
                        .otherwise({
                redirectTo: '/createLessonKlas'
            });
    }]);


//1
//Controllers voor lessen maken
app.controller("createLessonKlasCtrl", function($scope, $http, $location, summaryService){
   $scope.nextPageKlas = function($klas){
   	summaryService.addKlas($klas);
		$location.path("/createLessonSubject");
   }
});
app.controller("createLessonSubjectCtrl", function($scope, $http, $location, summaryService){
	$scope.klas = summaryService.getKlas();
   $scope.nextPageSubject = function($vak){
   	summaryService.addVak($vak);
		$location.path("/createLessonQuestions");
   }
});

app.controller("createLessonQuestionsCtrl", function($scope, $http, $location, summaryService){
	   		$scope.klas = summaryService.getKlas();
	$scope.vak = summaryService.getVak();
   $scope.nextPageQuestions= function(){
		$location.path("/createLessonSummary");
   }
});

app.controller("createLessonSummary", function($scope, $http, $location, summaryService){
	$scope.klas = summaryService.getKlas();
	$scope.vak = summaryService.getVak();
    
    
    
    $scope.data = [ {klas:$scope.klas},
                    {vak:$scope.vak}
                  ];

        $scope.submit=function(){ 
            $http.post("http://localhost:3000/firebase/post", $scope.data )
            .success(function(data){	
              
               console.log("posted successfully");
                console.log($scope.data);

            })
            .error(function(data){
                console.error("error in posting");
                console.log($scope.data)
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

  var addKlas = function(newObj) {
      klas = newObj;  };
  var addVak = function(newObj) {
      vak = newObj;  };

  var getKlas = function(){
      return klas;
  };
    var getVak = function(){
      return vak;
  };

  return {
    addKlas: addKlas,
    addVak: addVak,
    getKlas: getKlas,
    getVak: getVak,

  };

});
//Eind van controllers voor lessen maken


app.controller("startLessonCtrl", function($scope, $http, $location){
	$scope.startLes = function(){
		console.log("LOL");
	}

	});