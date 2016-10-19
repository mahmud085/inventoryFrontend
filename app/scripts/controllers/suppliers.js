'use strict';

angular.module('inventoryAppApp')
    .controller('SuppliersCtrl', ["$scope","$http", "sharedata", "$uibModal",
        function ($scope, $http,sharedata, $uibModal) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();

            $scope.mySuppliers = {};
            $scope.mySuppliers.enableFiltering = true;
            $scope.mySuppliers.rowHeight = 40;
            $scope.mySuppliers.enableColumnResizing = true ;
            $scope.mySuppliers.columnDefs = [
                {
                    name: 'name',
                    displayName: 'Supplier Name',
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

            $scope.getSuppliers = function () {
                var filter = "?filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("suppliers", filter,$scope.auth)
                    .then(function (data) {
                        $scope.mySuppliers.data = data;
                    });   
            }

            $scope.getSuppliers();
            $scope.showHistory = function(row) {
                console.log("Inside History suppliers");
                $scope.row = row.entity;
                $uibModal.open({
                    templateUrl: 'views/supplier_history.html',
                    controller: 'SupplierHistoryCtrl',
                    controllerAs: 'supplierhistory',
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
                    templateUrl: 'views/editsupplier.html',
                    controller: 'EditsupplierCtrl',
                    controllerAs: 'edit',
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
                    sharedata.deleteData(row.entity, "suppliers",$scope.auth);
                }
            }

        }]);
