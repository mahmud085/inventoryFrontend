'use strict';

angular.module('inventoryAppApp')
    .controller('EditCtrl', ['$scope', '$uibModalInstance', "row", "sharedata",
        function ($scope, $uibModalInstance, row, sharedata) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.product = {};
            $scope.product.id = row.id;
            $scope.product.name = row.name;
            $scope.product.sku_number = row.sku_number;
            $scope.product.description = row.description;
            $scope.product.buy_price = row.buy_price;
            $scope.product.sell_price = row.sell_price
            $scope.categoryList = [];
            $scope.suppliersList = [];
            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("categories", filter,$scope.auth)
                .then(function (data) {
                    $scope.categoryList = data;
                });
            
            sharedata.getData("suppliers", filter,$scope.auth)
                .then(function (data) {
                    $scope.suppliersList = data;
                });

            $scope.product.categoryId = row.categoryId;
            $scope.product.supplierId = row.supplierId;

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

            $scope.editProduct = function (product) {
                sharedata.edit(product, "products",$scope.auth)
                $uibModalInstance.close();
            }
        }]);
