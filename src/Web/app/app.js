var app = angular.module("myapp",[]);
app.controller("mainCtrl", function($scope, $http){
    
    $scope.Greet = function() {
        console.log("Hello World")
         };

});

