'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:SalesagentHistoryCtrl
 * @description
 * # SalesagentHistoryCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
  .controller('SalesagentHistoryCtrl', [ "$scope", "sharedata", "row","$uibModalInstance", 
    function ($scope, sharedata, row,$uibModalInstance) {
        $scope.auth = sharedata.getAccessToken();
        $scope.userObj = sharedata.getUserObj();
        console.log(row);  
        $scope.totalAmount = 0;
        $scope.totalPaid = 0;
        $scope.totalDue = 0;
        $scope.SalesAgentName = row.name;
        var filter = "?filter[where][salesagentId]=" + row.id+"&filter[where][userId]="+$scope.userObj.userId;
        sharedata.getData("transaction_sells", filter,$scope.auth).then(function (data) {
          console.log("SalesAgent data ",data);
           for(var i=0;i<data.length;i++){
            $scope.totalAmount += data[i].total;
            $scope.totalPaid += data[i].cash_in;
            $scope.totalDue += data[i].due;
           }

        });    
        $scope.mySalesAgentHistory = {};
        $scope.mySalesAgentHistory.enableFiltering = true;
        $scope.mySalesAgentHistory.rowHeight = 40;
        $scope.mySalesAgentHistory.enableColumnResizing = true;
        $scope.mySalesAgentHistory.columnDefs = [
            {
                name: 'product.name',
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
                name: 'date',
                enableCellEdit: false
            }
            /*{
                name: 'transactions.date',
                displayName: 'Date (yyyy-mm-dd)',
                enableCellEdit: false
            }*/
        ]
        var filter = "?filter[where][salesagentId]=" + row.id + "&filter[include]=product&filter[where][userId]="+$scope.userObj.userId;// + "&filter[include]=transactions";
        sharedata.getData("inventory_holds", filter,$scope.auth).then(function(data) {
            $scope.mySalesAgentHistory.data = data;
        });
        $scope.cancel = function(){
            $uibModalInstance.close();
        }
  }]);
