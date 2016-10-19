'use strict';

angular.module('inventoryAppApp')
    .controller('addConversionCtrl', ["$scope", "$http", "sharedata",
        function ($scope, $http, sharedata) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.productList = [];
            $scope.categoryList = [];
            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("categories", filter,$scope.auth).then(function (data) {
                $scope.categoryList = data;
            });
            
            //getting product according to category
            $scope.getProduct = function(categoryId) {
                var filter = "?filter[where][categoryId]=" + categoryId + "&filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("products", filter,$scope.auth).then( function(data) {
                    $scope.productList = data;
                })
            }
            
            $scope.add = function (conversion) {
                conversion.userId = $scope.userObj.userId;
                sharedata.postData(conversion, "conversions",$scope.auth);
            }

        }]);
