'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:InventoryCtrl
 * @description
 * # InventoryCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
  .controller('InventoryCtrl', [ "$scope","$http", "sharedata", "$uibModal",
        function ($scope,$http,sharedata, $uibModal) {
        $scope.auth = sharedata.getAccessToken();
        $scope.userObj = sharedata.getUserObj();
        $scope.inventoryList = [];
        $scope.myInventory = {};
        $scope.myInventory.enableColumnResizing = true ;
        $scope.myInventory = {
            enableFiltering: true,
            enableCellEdit: true,
            rowHeight: 40,
            columnDefs: [
                { name: 'products.name',
                  displayName: "Product Name",
                },
                { name: 'available_amount',
                  displayName: "Available Amount",
                },
                { name: 'location',
                } 
            ]
        };
        
        $scope.getInventory = function() {
            var filter = "?filter[include]=products&filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("inventories", filter,$scope.auth)
                .then(function(data) {
                    $scope.myInventory.data = data;  
                });
        }
        $scope.getInventory();
        
        $scope.move = function() {
            $scope.inventoryList = $scope.myInventory.data;
            $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/move_product.html',
                    controller: 'MoveProductCtrl',
                    controllerAs: 'moveProduct'
                });
        }
        $scope.convert = function() {
              $uibModal.open({
                  animation: $scope.animationsEnabled,
                  templateUrl: 'views/convertProducts.html',
                  controller: 'ConvertProductCtrl',
                  controllerAs: 'ConvertProduct'
              });
        }

        $scope.deleteData = function (row) {
          var r = confirm("Do you Really want to DELETE this !!!! ");
          if(r){
            sharedata.deleteData(row.entity, "inventories",$scope.auth);
          }
        }
        
  }]);
