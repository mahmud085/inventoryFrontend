'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:CustomerhistoryCtrl
 * @description
 * # CustomerhistoryCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('SupplierHistoryCtrl', ["$scope", "sharedata", "row","$uibModalInstance",
     function ($scope, sharedata, row,$uibModalInstance) {
        $scope.auth = sharedata.getAccessToken();
        $scope.userObj = sharedata.getUserObj();
       console.log("SupplierHistory = ",row);
        $scope.supplierName = row.name;
        var filter = "/calculation?id=" + row.id;
        sharedata.getData("transaction_buys", filter,$scope.auth).then(function (data) {
            $scope.totalAmount = data.totalAmount;
            $scope.totalPaid = data.totalCashOut;
            $scope.totalDue = data.totalDue;
        });

        $scope.mySuppliersHistory = {};
        $scope.mySuppliersHistory.enableFiltering = true;
        $scope.mySuppliersHistory.rowHeight = 40;
        $scope.mySuppliersHistory.enableColumnResizing = true;
        $scope.mySuppliersHistory.columnDefs = [
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
        filter = "?filter[where][supplierId]=" + row.id + "&filter[include]=products&filter[include]=transactions&filter[where][userId]="+$scope.userObj.userId;
        sharedata.getData("buys", filter,$scope.auth).then(function(data) {
            $scope.mySuppliersHistory.data = data;
        });

        $scope.cancel = function(){
            $uibModalInstance.close();
        }
    }]);
