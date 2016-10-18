var app = angular.module("myapp",['ngRoute', 'ngAnimate']);
app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider
            .when('/createLesson', {
                title: 'CreateLesson',
                templateUrl: 'view/createLesson.html',
                controller: 'createLessonCtrl',
            })
                        .otherwise({
                redirectTo: '/createLesson'
            });
    }]);

app.controller("createLessonCtrl", function($scope, $http){
    
console.log("hallo");

});


