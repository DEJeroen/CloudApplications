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
                        .otherwise({
                redirectTo: '/createLessonKlas'
            });
    }]);

app.controller("createLessonKlasCtrl", function($scope, $http, $location){

   $scope.nextPageKlas = function($klas){
		$location.path("/createLessonSubject");
		console.log($klas);
   }
});
app.controller("createLessonSubjectCtrl", function($scope, $http, $location){

   $scope.nextPageSubject = function($vak){
		$location.path("/createLessonQuestions");
		console.log($vak);
   }
});

app.controller("createLessonQuestionsCtrl", function($scope, $http, $location){

   $scope.nextPageQuestions= function($q1, $q2, $q3){
		$location.path("/createLessonKlas");
		console.log($q1, $q2, $q3);
   }
});


