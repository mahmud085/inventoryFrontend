'use strict';

/**
 * @ngdoc directive
 * @name inventoryAppApp.directive:navbar
 * @description
 * # navbar
 */
angular.module('inventoryAppApp')
  .directive('navBar', function () {
    var controller =["$scope","sharedata","$location", '$cookies', '$cookieStore','$route' ,
    function($scope,sharedata,$location,$cookies, $cookieStore,$route){
      $scope.logout = false;
      $scope.usernameShow = true;
      $scope.username = "Inventory";
      $scope.getuser = function(){
          $scope.userObj = sharedata.getUserObj();
          $scope.auth = sharedata.getAccessToken();
          var filter ="?filter[where][id]="+$scope.userObj.userId;
          sharedata.getData("users", filter,$scope.auth)
            .then(function (data) {
              $scope.username = data[0].username;
              console.log("data ",$scope.username);
          })
      }
      //$scope.getuser();
      $scope.fnlogout = function(){
          console.log("logout clicked");
          $scope.username = "Inventory";
          $scope.logout = false;
          $cookieStore.remove("accessToken");
          $cookieStore.remove("userObj");
          $location.path('/');
         // $route.reload();
       }

      $scope.$on('$locationChangeStart', function() {

          console.log("navbar location change");
          if($location.path()==='/'){
            $scope.logout = false;
            console.log($scope.logout);
            $scope.username = "Inventory";
            console.log("cookie "+$cookieStore.get("accessToken"));
            
          }else{
            $scope.getuser();
            $scope.logout = true;
            console.log($scope.logout);
            //console.log("data ",$scope.username);
          }
        });

      }]
    
    return {
      templateUrl: 'views/navbar.html',
      restrict: 'E',
      controller: controller
    };
  });
