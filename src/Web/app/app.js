var app = angular.module("myapp",[]);
app.controller("mainCtrl", function($scope, $http){
    
  $scope.sayHello = function() {
   console.log("app.js werkt")
  };

});

