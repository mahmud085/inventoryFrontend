'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:DataviewCtrl
 * @description
 * # DataviewCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
  .controller('AddSupplierCtrl', [ "$scope", "sharedata", function ($scope, sharedata) {
        $scope.auth = sharedata.getAccessToken();
        $scope.userObj = sharedata.getUserObj();
        var row = {};
        $scope.add = function(row){
        	row.userId = $scope.userObj.userId;
            sharedata.postData(row, "suppliers",$scope.auth)
        }
  }]);
