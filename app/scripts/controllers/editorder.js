'use strict';

angular.module('inventoryAppApp')
    .controller('EditOrderCtrl', ['$scope', '$uibModalInstance', "row", "sharedata",
        function ($scope, $uibModalInstance, row, sharedata) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.order = {};
            $scope.order.id = row.id;
            $scope.order.date = row.date;
            $scope.order.quantity = row.quantity;
            $scope.order.date = row.date;
            $scope.order.status = row.status;
            $scope.order.description = row.description;

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
            $scope.order.customerId = row.customerId;
            $scope.order.productId = row.productId;
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

            $scope.editOrder = function (order) {
                sharedata.edit(order, "orders",$scope.auth)
                $uibModalInstance.close();
            }
        }]);
