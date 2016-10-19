'use strict';

angular.module('inventoryAppApp')
    .controller('AddproductCtrl', [ "$scope", "sharedata",
        function ( $scope, sharedata) {
            $scope.categoryList = [];
            $scope.suppliersList = [];
            $scope.product = {};
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            //calling sharedata's getData funtion providing model name and filter as arguments
            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("categories", filter,$scope.auth).then(function (data) {
                $scope.categoryList = data;
            });

            sharedata.getData("suppliers",filter,$scope.auth).then(function (data) {
                $scope.suppliersList = data;
            });
            
            //calling sharedata's postData function by providing an object to post and model name
            $scope.add = function (product) {
                product.userId = $scope.userObj.userId;
                sharedata.postData(product, "products",$scope.auth);
            }

        }]);