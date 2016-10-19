'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:EditsaleagentCtrl
 * @description
 * # EditsaleagentCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('EditsaleagentCtrl', ["$scope", "row", "$uibModalInstance", "sharedata",
        function ($scope, row, $uibModalInstance, sharedata) {
            $scope.auth = sharedata.getAccessToken();
            $scope.sa = {};
            $scope.sa.id = row.id;
            $scope.sa.name = row.name;
            $scope.sa.address = row.address;
            $scope.sa.phone = row.phone;

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

            $scope.editSaleAgent = function (sa) {
                sharedata.edit(sa, "sales_agents",$scope.auth);
                $uibModalInstance.close();
            }
        }]);
  