'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:CustomerhistoryCtrl
 * @description
 * # CustomerhistoryCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('CustomerhistoryCtrl', ["$scope", "sharedata", "row","$uibModalInstance",
     function ($scope, sharedata, row,$uibModalInstance) {
        $scope.auth = sharedata.getAccessToken();
        $scope.userObj = sharedata.getUserObj();
        $scope.customerName = row.name;
        var filter = "/calculation?id=" + row.id;
        sharedata.getData("transaction_sells", filter,$scope.auth).then(function (data) {
            $scope.totalAmount = data.totalAmount;
            $scope.totalPaid = data.totalCashIn;
            $scope.totalDue = data.totalDue;
        });

        $scope.myCustomersHistory = {};
        $scope.myCustomersHistory.enableFiltering = true;
        $scope.myCustomersHistory.rowHeight = 40;
        $scope.myCustomersHistory.enableColumnResizing = true;
        $scope.myCustomersHistory.columnDefs = [
            {
                name: 'products.name',
                displayName: 'Product Name',
                enableCellEdit: false,
                enableFiltering: false
            },
            {
                name: 'quantity',
                enableCellEdit: false
            },
            {
                name: 'amount',
                enableCellEdit: false
            },
            {
                name: 'location',
                enableCellEdit: false
            },
            {
                name: 'transactions.date',
                displayName: 'Date (yyyy-mm-dd)',
                enableCellEdit: false
            }
        ]
        filter = "?filter[where][customerId]=" + row.id + "&filter[include]=products" + "&filter[include]=transactions&filter[where][userId]="+$scope.userObj.userId;
        sharedata.getData("sells", filter,$scope.auth).then(function(data) {
            $scope.myCustomersHistory.data = data;
        });

        $scope.cancel = function(){
            $uibModalInstance.close();
        }
    }]);
