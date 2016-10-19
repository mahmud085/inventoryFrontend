'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:AddcustomerCtrl
 * @description
 * # AddcustomerCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
  .controller('addOrderCtrl', [ "$scope", "sharedata", function ($scope, sharedata) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            var row = {};
            var productList = {};
            var customerList = {};

            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("products", filter,$scope.auth)
                .then(function (data) {
                    $scope.productList = data;
                })

            sharedata.getData("customers", filter,$scope.auth)
                .then(function (data) {
                    $scope.customerList = data;
                })
            $scope.add = function(order){
            	order.userId = $scope.userObj.userId;
            	console.log("order =",order);
                sharedata.postData(order, "orders",$scope.auth)
            }
  }]);
