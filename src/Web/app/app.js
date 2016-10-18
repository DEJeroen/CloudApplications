var app = angular.module("myapp",['ngRoute', 'ngAnimate']);
app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
            .when('/createLesson', {
                title: 'createLesson',
                templateUrl: 'view/makingLessons/createLesson.html',
                controller: 'createLessonCtrl',
            })
                        .when('/chooseSubject', {
                title: 'chooseSubject',
                templateUrl: 'view/makingLessons/chooseSubject.html',
                controller: 'createLessonCtrl',
            })
                       .when('/chooseVragen', {
                title: 'chooseVragen',
                templateUrl: 'view/makingLessons/chooseVragen.html',
                controller: 'createLessonCtrl',
            })
                        .otherwise({
                redirectTo: '/createLesson'
            });
    }]);

app.controller("createLessonCtrl", function($scope, $http){
   $scope.laatzienGroep = function (groep){
alert(groep);
   };

      $scope.laatzienVak = function (vak){
alert(vak);
   };

         $scope.laatzienVragen = function (vraag1, vraag2, vraag3){
alert(vraag1 +" "+  vraag2+" " + vraag3 + " zijn je gekozen vragen.");
   };


});


