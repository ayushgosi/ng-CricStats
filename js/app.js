//Modules
var cricStats = angular.module('cricStats', ['ngRoute', 'ngResource']);

//Routes
cricStats.config(function($routeProvider){
  $routeProvider

  .when('/', {
    templateUrl: 'pages/main.htm',
    controller: 'mainController'
  })

    .when('/info', {
      templateUrl: 'pages/info.htm',
      controller: 'infoController'
    })
});

//Services
cricStats.service('cricService', function(){
  this.uniqueId = null;
});

//Controllers
cricStats.controller('mainController', ['$scope', '$http', 'cricService', function($scope, $http, cricService){

  $scope.dt = new Date();

  $scope.getData = function() {
   $http({method : 'GET',url : 'http://cricapi.com/api/cricket'})
   .success(function(data) {
     $scope.input = data;
   });
  };
  $scope.getData();

  $scope.cricFunction = function(id){
    cricService.uniqueId = id;
  };

}]);

cricStats.controller('infoController',['$scope', '$http', 'cricService', function($scope, $http, cricService){

  $scope.dt = new Date();
  $scope.uniqueId = cricService.uniqueId;

  $scope.getData = function(id) {
   $http({method : 'GET',url : 'http://cricapi.com/api/cricketScore?unique_id='+id})
   .success(function(data) {
     $scope.input = data;
     console.log($scope.input);
   });
  };
  $scope.getData($scope.uniqueId);

}]);
