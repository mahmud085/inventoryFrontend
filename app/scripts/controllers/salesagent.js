'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:SalesagentCtrl
 * @description
 * # SalesagentCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('SalesagentCtrl', ["$scope","$http", "sharedata", "$uibModal",
        function ($scope, $http,sharedata, $uibModal) {
            $scope.mySalesAgents = {};
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.mySalesAgents.enableFiltering = true;
            $scope.mySalesAgents.rowHeight = 40;
            $scope.mySalesAgents.enableColumnResizing = true ;
            $scope.mySalesAgents.columnDefs = [
                {
                    name: 'name',
                    displayName: 'Sales Agent Name',
                    enableCellEdit: false
                },
                {
                    name: 'address',
                    enableCellEdit: false
                },
                {
                    name: 'phone',
                    enableCellEdit: false
                },
                {
                    name: 'Action',
                    enableFiltering: false,
                    cellEditableCondition: false,
                    cellTemplate: 'views/buttons.html'
                },
                {
                    name: 'History',
                    enableFiltering: false,
                    cellEditableCondition: false,
                    cellTemplate: 'views/button_history.html'

                }
            ]

            $scope.getSalesAgent = function () {
                var filter = "?filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("sales_agents", filter,$scope.auth)
                    .then(function (data) {
                        $scope.mySalesAgents.data = data;
                    });
            }
            $scope.getSalesAgent();
            
            $scope.showHistory = function(row) {
                console.log("Inside History");
                $scope.row = row.entity;
                $uibModal.open({
                    templateUrl: 'views/salesagent_history.html',
                    controller: 'SalesagentHistoryCtrl',
                    controllerAs: 'salesagentHistory',
                    size: "lg",
                    resolve: {
                        row: function () {
                            return $scope.row;
                        }
                    }
                });
            }
            
            $scope.editData = function (row) {
                $scope.row = row.entity;
                $uibModal.open({
                    templateUrl: 'views/editsaleagent.html',
                    controller: 'EditsaleagentCtrl',
                    controllerAs: 'editsaleagent',
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
                    sharedata.deleteData(row.entity, "sales_agents",$scope.auth);
                }
            }

        }]);
