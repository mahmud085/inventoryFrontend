'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:EditsupplierCtrl
 * @description
 * # EditsupplierCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('EditsupplierCtrl', ["$scope", "row", "$uibModalInstance", "sharedata",
        function ($scope, row, $uibModalInstance,sharedata) {
            $scope.auth = sharedata.getAccessToken();
            $scope.supplier = {};
            $scope.supplier.id = row.id;
            $scope.supplier.name = row.name;
            $scope.supplier.address = row.address;
            $scope.supplier.phone = row.phone;

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }
            
            $scope.editSupplier = function(supplier){
                sharedata.edit(supplier, "suppliers",$scope.auth);
                $uibModalInstance.close();
            }
            
        }]);
 