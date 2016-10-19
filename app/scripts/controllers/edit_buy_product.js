'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:EditBuyProductCtrl
 * @description
 * # EditBuyProductCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('EditBuyProductCtrl', ["$scope", "sharedata", "row", "$uibModalInstance",
        function ($scope, sharedata, row, $uibModalInstance) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            console.log("Edit Buy Row : ",row);
            $scope.buy = {};
            $scope.productList = [];
            $scope.supplierList = [];
            $scope.index = 0;
            
            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("products", filter,$scope.auth)
                .then(function (data) {
                    $scope.productList = data;
                })

            sharedata.getData("suppliers", filter,$scope.auth)
                .then(function (data) {
                    $scope.supplierList = data;
                })

            $scope.buy.id = row.id;
            $scope.buy.productName = row.productName;
            $scope.buy.productId = row.productId;
            $scope.buy.location = row.location;
            $scope.buy.quantity = row.quantity;
            $scope.buy.supplierId = row.supplierId;
            $scope.buy.amount = row.amount;
            $scope.buy.buy_price = row.products.buy_price;

            $scope.getAmount = function (productId,quantity, price) {
                for (var i = 0; i < $scope.productList.length; i++) {
                    if ($scope.productList[i].id === productId) {
                        $scope.buy.buy_price = $scope.productList[i].buy_price;
                        $scope.buy.productName = $scope.productList[i].name;
                    }
                }
                //$scope.buy.productName = row.productName;
                //$scope.buy.productId = row.productId;
                $scope.buy.amount = quantity * price;
            }
            

            $scope.editBuy = function (buy) {
                console.log(buy);
                sharedata.edit(buy,"buys",$scope.auth);
                $uibModalInstance.close();
            }

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

        }]);
