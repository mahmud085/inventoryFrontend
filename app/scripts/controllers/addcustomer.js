'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:AddcustomerCtrl
 * @description
 * # AddcustomerCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
  .controller('AddcustomerCtrl', [ "$scope", "sharedata", function ($scope, sharedata) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            var row = {};

            $scope.add = function(row){
            	row.userId = $scope.userObj.userId;
            	console.log("row =",row);
                sharedata.postData(row, "customers",$scope.auth)
            }
  }]);
