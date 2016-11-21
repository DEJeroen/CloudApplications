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
              .when('/viewquestion', {
                title: 'viewquestion',
                templateUrl: 'view/startLessons/viewquestion.html',
                controller: 'viewquestionCtrl',
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

	    $scope.data = [ {klas:$scope.klas},{klasnaam:$scope.klas},
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
app.controller("startLessonCtrl", function($scope, $http, $location, DataService){

 
    
    
    var getuserclass=function(){ 
            $http.get("http://localhost:3000/firebase/StartLes")
            .success(function(UserData){	
              

            
                
               console.log("successfully retrieved user date");
               console.log(UserData);
                console.log(UserData.klas);
               $scope.data = UserData;
 

            })
            .error(function(UserData){
                console.error("error in retrieving");
                console.log(UserData)
            });
	
        
        }
    
   
    getuserclass();
     
    
           $scope.startLes = function(dataforservice){ 
               console.log($scope.selectedData);
            var dataforservice = $scope.selectedData;
               $location.path("/viewquestion");
               
        DataService.addProduct(dataforservice);
              
               
        };
    
        $scope.$watch("data.SelectedLes",function(){
             $scope.search = $scope.data.SelectedLes[0];
            console.log($scope.search);
            $scope.selectedData=$scope.data.klas[$scope.search];
             console.log($scope.selectedData);
        })

	});

app.controller("viewquestionCtrl", function($scope, $http, $location, DataService){
    $scope.data = DataService.getProducts();
    

    console.log($scope.data);
    
    $scope.viewdata = $scope.data[0].vak;
   





    
});

app.service('DataService', function() {
var productList = [];

  var addProduct = function(newObj) {
      productList.push(newObj);
  };

  var getProducts = function(){
      return productList;
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts
  };
    
});
//Eind van controllers voor les geven