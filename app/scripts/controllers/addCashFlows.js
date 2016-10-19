'use strict';

angular.module('inventoryAppApp')
    .controller('addCashFlowsCtrl', ["$scope", "sharedata","$uibModalInstance",
        function ($scope, sharedata,$uibModalInstance) {
        $scope.auth = sharedata.getAccessToken();
        $scope.userObj = sharedata.getUserObj();
        $scope.cashFlows = {};
        $scope.cashFlowItems = [];
        $scope.showText = false;
        $scope.cashFlows.payment_method = "Cash"
        
        $scope.saveCashFlows = function(cashFlows){
            cashFlows.userId = $scope.userObj.userId;
            sharedata.postData(cashFlows, "cash_flows",$scope.auth);
            $uibModalInstance.close();
        }
        $scope.checkAccount = function(){
             if($scope.cashFlows.payment_method === "Bank")
                  $scope.showText = true;
                else
                  $scope.showText = false;
        }    
        $scope.cancel = function () {
            $uibModalInstance.close();
        }
    }]);
