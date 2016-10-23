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
   $scope.nextPageSubject = function($vak){
   	summaryService.addVak($vak);
		$location.path("/createLessonQuestions");
   }
});

app.controller("createLessonQuestionsCtrl", function($scope, $http, $location, summaryService){
   $scope.nextPageQuestions= function($q1, $q2, $q3){
   	summaryService.addQ1($q1);
   	summaryService.addQ2($q2);
   	summaryService.addQ3($q3);
		$location.path("/createLessonSummary");
   }
});

app.controller("createLessonSummary", function($scope, $http, $location, summaryService){
	$scope.klas = summaryService.getKlas();
	$scope.vak = summaryService.getVak();
	$scope.q1 = summaryService.getQ1();
	$scope.q2 = summaryService.getQ2();
	$scope.q3 = summaryService.getQ3();
    
    
    
    $scope.data = [ {klas:$scope.klas},
                    {vak:$scope.vak},
                    {q1:$scope.q1},
                    {q2:$scope.q2},
                    {q3:$scope.q3}
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
  var q1;
  var q2;
  var q3;

  var addKlas = function(newObj) {
      klas = newObj;  };
  var addVak = function(newObj) {
      vak = newObj;  };
  var addQ1 = function(newObj) {
      q1 = newObj;  };
  var addQ2 = function(newObj) {
      q2 = newObj;  };
  var addQ3 = function(newObj) {
      q3 = newObj;  };

  var getKlas = function(){
      return klas;
  };
    var getVak = function(){
      return vak;
  };
    var getQ1 = function(){
      return q1;
  };
    var getQ2 = function(){
      return q2;
  };
    var getQ3 = function(){
      return q3;
  };

  return {
    addKlas: addKlas,
    addVak: addVak,
    addQ1: addQ1,
    addQ2: addQ2,
    addQ3: addQ3,
    getKlas: getKlas,
    getVak: getVak,
    getQ1: getQ1,
    getQ2: getQ2,
    getQ3: getQ3

  };

});
//Eind van controllers voor lessen maken


app.controller("startLessonCtrl", function($scope, $http, $location){
	$scope.startLes = function(){
		console.log("LOL");
	}

	});