'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:ProductHistoryCtrl
 * @description
 * # ProductHistoryCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
  .controller('ProductHistoryCtrl', [ "$scope", "sharedata", "row","$uibModalInstance",
    function ($scope, sharedata, row,$uibModalInstance) {
        $scope.auth = sharedata.getAccessToken();
        $scope.userObj = sharedata.getUserObj();
        $scope.row = row;
        $scope.row.godown = 0;
        $scope.row.shop = 0;
        $scope.row.sa = 0
        
        $scope.getGodownData = function() {
            var filter = "?filter[where][location]=Godown" + "&filter[where][productId]=" + row.id+"&filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("inventories", filter,$scope.auth).then(function(data) {
                $scope.row.godown = data[0].available_amount;
            })
        }
        $scope.getGodownData();
        
        $scope.getShopData = function() {
            var filter = "?filter[where][location]=Shop" + "&filter[where][productId]=" + row.id+"&filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("inventories", filter,$scope.auth).then(function(data) {
                $scope.row.shop = data[0].available_amount;
            })
        }
        $scope.getShopData();
        
        $scope.getSAData = function() {
            var filter = "?filter[where][productId]=" + row.id+"&filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("inventory_holds", filter,$scope.auth).then(function(data) {
                for(var i=0; i < data.length; i++) {
                    $scope.row.sa += data[i].quantity;
                }
            })
        }
        $scope.getSAData();

        $scope.cancel = function(){
             $uibModalInstance.close();
        }
        
  }]);
