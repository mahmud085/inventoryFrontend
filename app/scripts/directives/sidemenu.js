'use strict';

/**
 * @ngdoc directive
 * @name inventoryAppApp.directive:sidemenu
 * @description
 * # sidemenu
 */
angular.module('inventoryAppApp')
  .directive('sideMenu', function () {
    var controller = [ "$scope", "$location", function($scope, $location){
        $scope.isActive = function (viewLocation) { 
          if($location.path() === '/'){
            $scope.sidemenu = false;
          }
          else{
            $scope.sidemenu = true;
          }
        return viewLocation === $location.path();

        };
        $scope.product = false;
        $scope.productfn = function(){
          if($scope.product === true)
            $scope.product = false;
          else
            $scope.product = true;
        }
        $scope.inventory = false;
        $scope.inventoryfn = function(){
          if($scope.inventory === true)
            $scope.inventory = false;
          else
            $scope.inventory = true;
        }
        $scope.users = false;
        $scope.usersfn = function(){
          if($scope.users === true)
            $scope.users = false;
          else
            $scope.users = true;
        }
        $scope.transaction = false;
        $scope.transactionfn = function(){
          if($scope.transaction === true)
            $scope.transaction = false;
          else
            $scope.transaction = true;
        }


}]
    
    return {
      templateUrl: 'views/sidemenu.html',
      restrict: 'E',
      controller: controller
      
    };
  });
