'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:EditconversionCtrl
 * @description
 * # EditconversionCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
    .controller('EditconversionCtrl', ["$scope", "row", "sharedata", "$uibModalInstance",
        function ($scope, row, sharedata, $uibModalInstance) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.conversion = {};
            $scope.conversion.id = row.id;
            $scope.conversion.factor = row.factor;
            $scope.categoryList = [];
            $scope.productList = [];
            
            //getting category  
            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("categories", filter,$scope.auth).then(function (data) {
                $scope.categoryList = data;
            });
            $scope.conversion.categoryId = row.categoryId;
            
            //getting product according to category
            $scope.getProduct = function(categoryId) {
                var filter = "?filter[where][categoryId]=" + categoryId+"&filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("products", filter,$scope.auth).then( function(data) {
                    $scope.productList = data;
                })
            }
            $scope.getProduct($scope.conversion.categoryId);
            
            $scope.conversion.start_productId = row.start_productId;
            $scope.conversion.end_productId = row.end_productId;
            
            $scope.editConversion = function (conversion) {
                sharedata.edit(conversion, "conversions",$scope.auth);
                $uibModalInstance.close();
            }
            
            $scope.cancel = function(){
                $uibModalInstance.dismiss('cancel');
            }
            
        }]);
