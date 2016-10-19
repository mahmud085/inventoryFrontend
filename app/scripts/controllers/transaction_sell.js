'use strict';


angular.module('inventoryAppApp')
  .controller('TransactionSellCtrl', [ "$scope", "$http","sharedata","uiGridConstants","$uibModal", function ($scope, $http,sharedata,uiGridConstants,$uibModal) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.mySellTransaction = {};
            $scope.mySellTransaction.enableFiltering = true;
            $scope.mySellTransaction.rowHeight = 40;
            $scope.mySellTransaction.enableColumnResizing = true ;
            $scope.mySellTransaction.showColumnFooter = true ;
            $scope.mySellTransaction.columnDefs = [
                {
                    name: 'customer.name',
                    displayName: 'Customer Name',
                    enableCellEdit: false
                },
                {
                    name: 'salesAgent.name',
                    displayName: 'Sales Agent Name',
                    enableCellEdit: false
                },
                {
                    name: 'total',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">Total: {{col.getAggregationValue() | number:2 }}</div>', 
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    enableCellEdit: false
                },
                {
                    name: 'cash_in',
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
                var filter = "?filter[include]=customer&filter[include]=salesAgent&filter[where][userId]="+$scope.userObj.userId;
                if($scope.transaction_sell.date1 !== undefined && $scope.transaction_sell.date1 !== null && $scope.transaction_sell.date1 !== "" &&$scope.transaction_sell.date2 !== undefined && $scope.transaction_sell.date2 !== null && $scope.transaction_sell.date2 !== ""){
                filter  = filter + "&filter[where][date][between][0]="+$scope.transaction_sell.date1+"&filter[where][date][between][1]="+$scope.transaction_sell.date2;
                sharedata.getData("transaction_sells", filter,$scope.auth)
                    .then(function (data) {
                       $scope.mySellTransaction.data = data;
                    })
                }
            }
            $scope.addSellTransaction = function(){
                    $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/addSellTransaction.html',
                        controller: 'addSellTransactionCtrl',
                        controllerAs: 'addSellTransaction'
                    });
            }
            var filter = "?filter[include]=customer&filter[include]=salesAgent&filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("transaction_sells",filter,$scope.auth).then(function(data){
                $scope.mySellTransaction.data = data;
            })
  }]);
