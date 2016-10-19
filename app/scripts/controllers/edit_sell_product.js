'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:EditSellProductCtrl
 * @description
 * # EditSellProductCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('EditSellProductCtrl', ["$scope", "sharedata", "row", "$uibModalInstance", "cartList",
        function ($scope, sharedata, row, $uibModalInstance, cartList) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            console.log(row);
            console.log(cartList);
            $scope.sell = {}
            $scope.index = 0;
            $scope.sell.productName = row.productName;
            $scope.productList = [];
            
            for(var i=0; i < cartList.length; i++) {
                if(cartList[i].productId === row.productId) {
                    $scope.index = i;
                }
            }

            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("products", filter,$scope.auth)
                .then(function (data) {
                    $scope.productList = data;
                })

            $scope.getPrice = function(productId){
                for(var i=0; i < $scope.productList.length; i++){
                    if($scope.productList[i].id === productId){
                        $scope.sell.sell_price = $scope.productList[i].sell_price;
                        $scope.sell.productName = $scope.productList[i].name;
                    }
                }
            }           
            
            $scope.getAmount = function(quantity, price){
                $scope.sell.amount = quantity * price;
            }
            
            $scope.sell.productId = row.productId;
            $scope.sell.quantity = row.quantity;
            $scope.sell.amount = row.amount;
            $scope.sell.sell_price = row.sell_price;
            
            $scope.editSell = function (sell) {
                cartList[$scope.index].productId = $scope.sell.productId;
                cartList[$scope.index].productName = $scope.sell.productName;
                cartList[$scope.index].quantity = $scope.sell.quantity;
                cartList[$scope.index].amount = $scope.sell.amount;
                cartList[$scope.index].sell_price = $scope.sell.sell_price;
                $uibModalInstance.close();
            }

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

        }]);
