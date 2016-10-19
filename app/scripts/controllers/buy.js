'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:BuyCtrl
 * @description
 * # BuyCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('BuyCtrl', ["$scope","$http", "sharedata", "$uibModal","uiGridConstants",
        function ($scope,$http, sharedata, $uibModal,uiGridConstants) {
            
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.myBuyProducts = {};
            $scope.myBuyProducts.enableFiltering = true;
            $scope.myBuyProducts.rowHeight = 40;
            $scope.myBuyProducts.enableColumnResizing = true ;
            $scope.myBuyProducts.showColumnFooter = true ;
            $scope.myBuyProducts.columnDefs = [
                {
                    name: 'products.name',
                    displayName: 'Product Name',
                    enableCellEdit: false
                },
                {
                    name: 'location',
                    displayName: 'Location',
                    enableCellEdit: false
                },
                {
                    name: 'quantity',
                    displayName: 'Quantity',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">Total: {{col.getAggregationValue() | number:2 }}</div>', 
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    enableCellEdit: false
                },
                {
                    name: 'amount',
                    displayName: 'Amount(TK)',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">Total: {{col.getAggregationValue() | number:2 }}</div>', 
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    enableCellEdit: false
                },
                {
                    name: 'suppliers.name',
                    displayName: 'Supplier',
                    enableCellEdit: false
                },
                { 
                    name: 'date'
                }
                // ,
                // {
                //     name: 'Action',
                //     enableFiltering: false,
                //     cellEditableCondition: false,
                //     cellTemplate: 'views/buttons.html'

                // }
            ]

            //calling sharedata's getData function by providing model name and filter as arguments
            $scope.getBuyProducts = function(){
                var filter = "?filter[include]=products&filter[include]=suppliers&filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("buys", filter,$scope.auth)
                    .then(function (data) {
                        $scope.myBuyProducts.data = data;
                    })
            }
            $scope.getBuyProducts();
            
            $scope.filterByDate = function(){
                var filter = "?filter[include]=products&filter[include]=suppliers&filter[where][userId]="+$scope.userObj.userId;
                if($scope.buy.date1 !== undefined && $scope.buy.date1 !== null && $scope.buy.date1 !== "" &&$scope.buy.date2 !== undefined && $scope.buy.date2 !== null && $scope.buy.date2 !== ""){
                filter  = filter + "&filter[where][date][between][0]="+$scope.buy.date1+"&filter[where][date][between][1]="+$scope.buy.date2;
                sharedata.getData("buys", filter,$scope.auth)
                    .then(function (data) {
                        $scope.myBuyProducts.data = data;
                    })
            }
            }    
            $scope.editData = function (row) {
                $scope.row = row.entity;
                $uibModal.open({
                    templateUrl: 'views/edit_buy_product.html',
                    controller: 'EditBuyProductCtrl',
                    controllerAs: 'editbuyproduct',
                    resolve: {
                        row: function () {
                            return $scope.row;
                        }
                    }
                }); 
            }

            $scope.deleteData = function (row) {
                var r = confirm("Do you Really want to DELETE this !!!! ");
                if(r){
                    sharedata.deleteData(row.entity, "buys",$scope.auth);
                }
            }

        }]);
