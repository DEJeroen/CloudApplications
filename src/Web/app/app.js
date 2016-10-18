var app = angular.module("myapp",['ngRoute', 'ngAnimate']);
app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
            .when('/createLesson', {
                title: 'createLesson',
                templateUrl: 'view/createLesson.html',
                controller: 'createLessonCtrl',
            })
                        .otherwise({
                redirectTo: '/createLesson'
            });
    }]);

app.controller("createLessonCtrl", function($scope, $http){
   $scope.laatzien = function (groep){
alert(groep);
   };


});


