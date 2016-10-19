'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:CustomersCtrl
 * @description
 * # CustomersCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('CustomersCtrl', ["$scope", "$http","sharedata", "$uibModal",
        function ($scope, $http,sharedata, $uibModal) {
            $scope.myCustomers = {};
            $scope.myCustomers.enableFiltering = true;
            $scope.myCustomers.rowHeight = 40;
            $scope.myCustomers.enableColumnResizing = true ;
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            console.log("user = ",$scope.userObj);
            $scope.myCustomers.columnDefs = [
                {
                    name: 'name',
                    displayName: 'Customer Name',
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

            $scope.getCustomers = function () {
                var filter = "?filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("customers", filter,$scope.auth)
                    .then(function(data) {
                        $scope.myCustomers.data = data;
                    })
            }
            
            $scope.getCustomers();
            
            $scope.showHistory = function(row) {
                console.log("Inside History");
                $scope.row = row.entity;
                $uibModal.open({
                    templateUrl: 'views/customer_history.html',
                    controller: 'CustomerhistoryCtrl',
                    controllerAs: 'customerhistory',
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
                    templateUrl: 'views/editcustomer.html',
                    controller: 'EditcustomerCtrl',
                    controllerAs: 'editcustomer',
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
                    sharedata.deleteData(row.entity, "customers",$scope.auth);
                }
            }
            
      }]);
