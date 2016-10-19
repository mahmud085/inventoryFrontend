'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:EditcustomerCtrl
 * @description
 * # EditcustomerCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('EditcustomerCtrl', ["$scope", "row", "$uibModalInstance", "sharedata",
        function ($scope, row, $uibModalInstance, sharedata) {
            $scope.auth = sharedata.getAccessToken();
            $scope.customer = {};
            $scope.customer.id = row.id;
            $scope.customer.name = row.name;
            $scope.customer.address = row.address;
            $scope.customer.phone = row.phone;
             
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }
            
            $scope.editCustomer = function(customer){
                sharedata.edit(customer, "customers",$scope.auth);
                $uibModalInstance.close();
            }
            
        }]);
 