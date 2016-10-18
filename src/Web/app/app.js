var app = angular.module("myapp",['ngRoute', 'ngAnimate']);
app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
            .when('/createLesson', {
                title: 'createLesson',
                templateUrl: 'view/createLesson.html',
                controller: 'createLessonCtrl',
            })
                        .when('/chooseSubject', {
                title: 'chooseSubject',
                templateUrl: 'view/chooseSubject.html',
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


});


