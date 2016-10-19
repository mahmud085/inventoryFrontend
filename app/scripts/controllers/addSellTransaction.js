'use strict';

angular.module('inventoryAppApp')
    .controller('addSellTransactionCtrl', ["$scope", "sharedata","$uibModalInstance",
        function ($scope, sharedata,$uibModalInstance) {
        $scope.auth = sharedata.getAccessToken();
        $scope.userObj = sharedata.getUserObj();
        $scope.showText = false;
        $scope.sellTransaction = {};
        $scope.customerList = [];
        $scope.sellTransaction.payment_method = "Cash";
        $scope.sellTransaction.discount = 0 ;
         var filter = "?filter[where][userId]="+$scope.userObj.userId;
        sharedata.getData("customers", filter,$scope.auth)
        .then(function (data) {
            $scope.customerList = data;
        })
        $scope.saveTransaction = function(data){
            data.userId = $scope.userObj.userId;
            sharedata.postData(data, "transaction_sells",$scope.auth);
            $uibModalInstance.close();
        }
        $scope.checkAccount = function(){
             if($scope.sellTransaction.payment_method === "Bank")
                  $scope.showText = true;
                else
                  $scope.showText = false;
        }
        $scope.cancel = function () {
            $uibModalInstance.close();
        }
    }]);
