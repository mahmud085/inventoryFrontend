'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:EditeditcashFlowsleagentCtrl
 * @description
 * # EditeditcashFlowsleagentCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('EditCashFlowsCtrl', ["$scope", "row", "$uibModalInstance", "sharedata",
        function ($scope, row, $uibModalInstance, sharedata) {
            $scope.auth = sharedata.getAccessToken();
            
            $scope.editcashFlows = {};
            $scope.editcashFlows.id = row.id;
            $scope.editcashFlows.date = row.date;
            $scope.editcashFlows.cash_in = row.cash_in;
            $scope.editcashFlows.cash_out = row.cash_out;
            $scope.editcashFlows.payment_method = row.payment_method;
            $scope.editcashFlows.bankName = row.bankName;
            $scope.editcashFlows.checkNo = row.checkNo;
            $scope.editcashFlows.description = row.description;
            
            if($scope.editcashFlows.payment_method === 'Cash')
                $scope.showText = false ;
            else
                $scope.showText = true ;

            $scope.checkAccount = function(){
                if($scope.editcashFlows.payment_method === "Bank")
                {
                    $scope.showText = true;
                    $scope.editcashFlows.bankName = row.bankName;
                    $scope.editcashFlows.checkNo = row.checkNo;
                }
                else
                {
                    $scope.showText = false;
                    $scope.editcashFlows.bankName = "";
                    $scope.editcashFlows.checkNo = "";
                }
            }
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

            $scope.saveeditcashFlows = function (editcashFlows) {
                sharedata.edit(editcashFlows, "cash_flows",$scope.auth);
                $uibModalInstance.close();
            }
        }]);
  