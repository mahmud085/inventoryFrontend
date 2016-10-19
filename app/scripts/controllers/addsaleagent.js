'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:AddsaleagentCtrl
 * @description
 * # AddsaleagentCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
  .controller('AddsaleagentCtrl', [ "$scope", "sharedata", function ($scope, sharedata) {
        $scope.auth = sharedata.getAccessToken();
        $scope.userObj = sharedata.getUserObj();
        var row = {};
        $scope.add = function(row){
        		row.userId = $scope.userObj.userId;
                sharedata.postData(row, "sales_agents",$scope.auth)
            }
  }]);
