'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:TransactionBuyCtrl
 * @description
 * # TransactionBuyCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
  .controller('TransactionBuyCtrl', [ "$scope","$http", "sharedata","uiGridConstants","$uibModal", function ($scope, $http,sharedata,uiGridConstants,$uibModal) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.myBuyTransaction = {};
            $scope.myBuyTransaction.enableFiltering = true;
            $scope.myBuyTransaction.rowHeight = 40;
            $scope.myBuyTransaction.enableColumnResizing = true ;
            $scope.myBuyTransaction.showColumnFooter = true ;
            $scope.myBuyTransaction.columnDefs = [
                {
                    name: 'supplier.name',
                    displayName: 'Supplier Name',
                    enableCellEdit: false
                },
                {
                    name: 'total',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">Total: {{col.getAggregationValue() | number:2 }}</div>', 
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    enableCellEdit: false
                },
                {
                    name: 'cash_out',
                    displayName: 'Paid',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">Total: {{col.getAggregationValue() | number:2 }}</div>', 
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    enableCellEdit: false
                },
                {
                    name: 'discount',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">Total: {{col.getAggregationValue() | number:2 }}</div>', 
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    enableCellEdit: false
                },
                {
                    name: 'due',
                    displayName: 'Due',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">Total: {{col.getAggregationValue() | number:2 }}</div>', 
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    enableCellEdit: false
                },
                {
                    name: 'payment_method',
                    displayName: 'Payment Via',
                    enableCellEdit: false
                },
                {
                    name: 'date',
                    enableCellEdit: false
                }
            ]

            $scope.filterByDate = function(){
                var filter = "?filter[include]=supplier&filter[where][userId]="+$scope.userObj.userId;
                if($scope.transaction_buy.date1 !== undefined && $scope.transaction_buy.date1 !== null && $scope.transaction_buy.date1 !== "" &&$scope.transaction_buy.date2 !== undefined && $scope.transaction_buy.date2 !== null && $scope.transaction_buy.date2 !== ""){
                filter  = filter + "&filter[where][date][between][0]="+$scope.transaction_buy.date1+"&filter[where][date][between][1]="+$scope.transaction_buy.date2;
                sharedata.getData("transaction_buys", filter,$scope.auth)
                    .then(function (data) {
                       $scope.myBuyTransaction.data = data;
                    })
                }
            }
            $scope.addBuyTransaction = function(){
                    $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/addBuyTransaction.html',
                        controller: 'addBuyTransactionCtrl',
                        controllerAs: 'addBuyTransaction'
                    });
            }
            var filter = "?filter[include]=supplier&filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("transaction_buys", filter,$scope.auth).then(function(data){
                $scope.myBuyTransaction.data = data;
            })
  }]);
