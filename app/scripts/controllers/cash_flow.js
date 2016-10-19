'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:BuyCtrl
 * @description
 * # BuyCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('CashFlowCtrl', ["$scope", "$http","sharedata","uiGridConstants", "$uibModal",
        function ($scope, $http,sharedata,uiGridConstants, $uibModal) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.cashFlows = {};
            $scope.cashFlows.enableFiltering = true;
            $scope.cashFlows.rowHeight = 40;
            $scope.cashFlows.enableColumnResizing = true ;
            $scope.cashFlows.showColumnFooter = true ;
            $scope.cashFlows.columnDefs = [
                { 
                    name: 'date'
                },
                {
                    name: 'cash_in',
                    displayName: 'Cash In Amount',
                    footerCellTemplate: '<div class="ui-grid-cell-contents">Total: {{col.getAggregationValue() | number:2 }}</div>', 
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    enableCellEdit: false
                },
                {
                    name: 'cash_out',
                    displayName: 'Cash Out Amount',
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
                    name: 'bankName',
                    displayName: 'Bank Name',
                    enableCellEdit: false
                },
                {
                    name: 'checkNo',
                    displayName: 'Check No',
                    enableCellEdit: false
                },
                {
                    name: 'description',
                    displayName: 'Description',
                    enableCellEdit: false
                },
                {
                    name: 'Action',
                    enableFiltering: false,
                    cellEditableCondition: false,
                    cellTemplate: 'views/buttons.html'

                }
            ]

            //calling sharedata's getData function by providing model name and filter as arguments
            $scope.getCashFlows = function(){
                var filter = "?filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("cash_flows", filter,$scope.auth)
                    .then(function (data) {
                        $scope.cashFlows.data = data;
                    })
            }
            $scope.getCashFlows();
            
            $scope.addCashFlows = function() {
                $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/addCashFlows.html',
                        controller: 'addCashFlowsCtrl',
                        controllerAs: 'addCashFlows'
                    });
            }        
            $scope.editData = function (row) {
                $scope.row = row.entity;
                $uibModal.open({
                    templateUrl: 'views/editCashFlows.html',
                    controller: 'EditCashFlowsCtrl',
                    controllerAs: 'editCashFlows',
                    resolve: {
                        row: function () {
                            return $scope.row;
                        }
                    }
                });
            }
            $scope.filterByDate = function(){
                if($scope.cashFlow.date1 !== undefined && $scope.cashFlow.date1 !== null && $scope.cashFlow.date1 !== "" &&$scope.cashFlow.date2 !== undefined && $scope.cashFlow.date2 !== null && $scope.cashFlow.date2 !== ""){
                var filter  = "?filter[where][date][between][0]="+$scope.cashFlow.date1+"&filter[where][date][between][1]="+$scope.cashFlow.date2+"&filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("cash_flows", filter,$scope.auth)
                    .then(function (data) {
                       $scope.cashFlows.data = data;
                    })
                }
            }

            $scope.deleteData = function (row) {
                var r = confirm("Do you Really want to DELETE this !!!! ");
                if(r){
                    sharedata.deleteData(row.entity, "cash_flows",$scope.auth);
                }
            }

        }]);
