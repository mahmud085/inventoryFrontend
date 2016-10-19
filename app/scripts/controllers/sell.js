'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:SellCtrl
 * @description
 * # SellCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('SellCtrl', ["$scope","$http", "sharedata", "$uibModal","uiGridConstants",
        function ($scope,$http, sharedata, $uibModal,uiGridConstants) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.mySellProducts = {};
            $scope.mySellProducts.enableFiltering = true;
            $scope.mySellProducts.rowHeight = 40;
            $scope.mySellProducts.enableColumnResizing = true ;
            $scope.mySellProducts.showColumnFooter = true ;
            $scope.mySellProducts.columnDefs = [
                {
                    name: 'products.name',
                    displayName: 'Product Name',
                    enableCellEdit: false
                },
                {
                    name: 'location',
                    enableCellEdit: false,
                    width: 100
                },
                {
                    name: 'quantity',
                    enableCellEdit: false,
                    footerCellTemplate: '<div class="ui-grid-cell-contents">Total: {{col.getAggregationValue() | number:2 }}</div>', 
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    width: 100
                },
               {
                    name: 'amount',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">Total: {{col.getAggregationValue() | number:2 }}</div>', 
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    enableCellEdit: false
                },
                {
                    name: 'customers.name',
                    displayName: 'Customer',
                    enableCellEdit: false
                },
                {
                    name: 'salesAgent.name',
                    displayName: 'Sales Agent',
                    enableCellEdit: false
                },
                { 
                    name: 'date'
                }
            ]
 
            $scope.filterByDate = function(){
                var filter = "?filter[include]=products&filter[include]=customers&filter[include]=salesAgent&filter[where][userId]="+$scope.userObj.userId;
                if($scope.sell.date1 !== undefined && $scope.sell.date1 !== null && $scope.sell.date1 !== "" &&$scope.sell.date2 !== undefined && $scope.sell.date2 !== null && $scope.sell.date2 !== ""){
                filter  = filter + "&filter[where][date][between][0]="+$scope.sell.date1+"&filter[where][date][between][1]="+$scope.sell.date2;
                sharedata.getData("sells", filter,$scope.auth)
                    .then(function (data) {
                       $scope.mySellProducts.data = data;
                    })
            }
            } 
            var filter = "?filter[include]=products&filter[include]=customers&filter[include]=salesAgent&filter[where][userId]="+$scope.userObj.userId;
            //calling sharedata's getData function providing 2 argument model name and filter
            sharedata.getData("sells", filter,$scope.auth)
                .then(function (data) {
                    $scope.mySellProducts.data = data;
                })
                
        }]);
