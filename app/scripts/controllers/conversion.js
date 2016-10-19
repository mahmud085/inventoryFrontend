'use strict';

angular.module('inventoryAppApp')
    .controller('ConversionCtrl', ["$scope","$http", "sharedata", "$uibModal",
        function ($scope,$http, sharedata, $uibModal) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.myConversion = {};
            $scope.myConversion.enableFiltering = true;
            $scope.myConversion.rowHeight = 40;
            $scope.myConversion.enableColumnResizing = true ;
            $scope.myConversion.columnDefs = [
                {
                    name: 'category.name',
                    displayName: 'Category Name',
                    enableCellEdit: false
                },
                {
                    name: 'start_product.name',
                    displayName: 'Start Product Name',
                    enableCellEdit: false
                },
                {
                    name: 'end_product.name',
                    displayName: 'End Product Name',
                    enableCellEdit: false
                },
                {
                    name: 'factor',
                    enableCellEdit: false
                },
                {
                    name: 'Action',
                    enableFiltering: false,
                    cellEditableCondition: false,
                    cellTemplate: 'views/buttons.html'

                }
            ]
            var filter = "?filter[include]=category&filter[include]=start_product&filter[include]=end_product&filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("conversions",filter ,$scope.auth)
                .then(function (data) {
                    $scope.myConversion.data = data;
                })

            $scope.editData = function (row) {
                $scope.row = row.entity;
                $uibModal.open({
                    templateUrl: 'views/editconversion.html',
                    controller: 'EditconversionCtrl',
                    controllerAs: 'editconversion',
                    resolve: {
                        row: function () {
                            return $scope.row;
                        }
                    }
                });
            }
            $scope.move = function() {
               
                $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'views/convertProducts.html',
                        controller: 'ConvertProductCtrl',
                        controllerAs: 'ConvertProduct'
                    });
            }

            $scope.deleteData = function (row) {
                alert("Do you Really want to DELETE this !!!! ");
                sharedata.deleteData(row.entity, "conversions",$scope.auth);
            }

        }]);
