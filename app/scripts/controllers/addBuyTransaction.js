'use strict';

angular.module('inventoryAppApp')
    .controller('addBuyTransactionCtrl', ["$scope", "sharedata","$uibModalInstance",
        function ($scope, sharedata,$uibModalInstance) {
        $scope.auth = sharedata.getAccessToken();
        $scope.userObj = sharedata.getUserObj();
        $scope.showText = false;
        $scope.buyTransaction = {};
        $scope.supplierList = [];
        $scope.buyTransaction.payment_method = "Cash";
        $scope.buyTransaction.discount = 0 ;
        var filter = "?filter[where][userId]="+$scope.userObj.userId;
        sharedata.getData("suppliers",filter,$scope.auth)
        .then(function (data) {
            $scope.supplierList = data;
        })
        $scope.saveTransaction = function(data){
            data.userId = $scope.userObj.userId;
            sharedata.postData(data, "transaction_buys",$scope.auth);
            $uibModalInstance.close();
        }
        $scope.checkAccount = function(){
             if($scope.buyTransaction.payment_method === "Bank")
                  $scope.showText = true;
                else
                  $scope.showText = false;
        }
        $scope.cancel = function () {
            $uibModalInstance.close();
        }
    }]);
