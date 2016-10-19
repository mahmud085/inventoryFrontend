'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:EditHoldProductCtrl
 * @description
 * # EditHoldProductCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('EditHoldProductCtrl', ["$scope", "sharedata", "row", "cartList", "$uibModalInstance",
        function ($scope, sharedata, row, cartList, $uibModalInstance) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.hold = {}
            $scope.index = 0;
            $scope.hold.productName = row.productName;
            $scope.productList = [];
            $scope.salesagentList = [];
            $scope.hold.productId = "";
            $scope.hold.salesagentId = "";
            
            for (var i = 0; i < cartList.length; i++) {
                if (cartList[i].productId === row.productId) {
                    $scope.index = i;
                }
            }
            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("products", filter,$scope.auth)
                .then(function (data) {
                    $scope.productList = data;
                })
            
            sharedata.getData("sales_agents", filter,$scope.auth)
                .then(function (data) {
                    $scope.salesagentList = data;
                })    

            $scope.getAmount = function (quantity) {
                for (var i = 0; i < $scope.productList.length; i++) {
                    if ($scope.productList[i].id === $scope.hold.productId) {
                        $scope.hold.sell_price = $scope.productList[i].sell_price;
                        $scope.hold.productName = $scope.productList[i].name;
                    }
                }
                $scope.hold.amount = quantity * $scope.hold.sell_price;
            }

            $scope.hold.salesagentId = row.salesagentId;
            $scope.hold.productId = row.productId;
            $scope.hold.quantity = row.quantity;
            $scope.hold.amount = row.amount;
            $scope.hold.sell_price = row.sell_price;

            $scope.editHold = function (hold) {
                cartList[$scope.index].salesagentId = $scope.hold.salesagentId;
                cartList[$scope.index].productId = $scope.hold.productId;
                cartList[$scope.index].productName = $scope.hold.productName;
                cartList[$scope.index].quantity = $scope.hold.quantity;
                cartList[$scope.index].amount = $scope.hold.amount;
                cartList[$scope.index].sell_price = $scope.hold.sell_price;
                $uibModalInstance.close();
            }

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }
        }]);
