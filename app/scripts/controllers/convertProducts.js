'use strict';

angular.module('inventoryAppApp')
    .controller('ConvertProductCtrl', ["$scope", "sharedata", "$route", "$http","$uibModalInstance",
        function ($scope, sharedata, $route, $http,$uibModalInstance) {
            $scope.mainurl = sharedata.getUrl();
            console.log("Url = ",$scope.mainurl);
            $scope.auth = sharedata.getAccessToken();
             $scope.userObj = sharedata.getUserObj();
            $scope.convert = {} ;
            $scope.inventoryList = [];
            $scope.endProductsList = [];
            $scope.moveProducts = [];
            $scope.invalid = false;

            var filter = "?filter[include]=products&filter[where][location]=Shop&filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("inventories", filter,$scope.auth)
                .then(function (data) {
                    $scope.inventoryList = data;
                })

            $scope.getEndProducts = function(start_productId){
                var filter = "?filter[include]=end_product" + "&filter[where][start_productId]="+start_productId+"&filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("conversions", filter,$scope.auth)
                    .then(function (data) {
                        console.log(data);
                        $scope.endProductsList = data;
                    })

                for (var i = 0; i < $scope.inventoryList.length; i++) {
                    if ($scope.inventoryList[i].productId === start_productId) {
                        $scope.convert.available_quantity = $scope.inventoryList[i].available_amount;
                    }
                }
            }
            $scope.calculate = function(available_quantity,quantity){
                if(quantity>available_quantity){
                   $scope.invalid = true ;
                } else {
                     $scope.invalid = false ;
                }
                $scope.convert.total = $scope.convert.quantity * $scope.convert.factor;
            }
            $scope.getFactor = function(start_productId,end_productId){
                var filter = "?filter[where][start_productId]="+start_productId + "&filter[where][end_productId]="+end_productId+"&filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("conversions", filter,$scope.auth)
                    .then(function (data) {
                        console.log(data);
                        $scope.convert.factor = data[0].factor;
                    })
            }
            function clone(obj) {
                if (null == obj || "object" != typeof obj) return obj;
                var copy = obj.constructor();
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
                }
                return copy;
            }
            
            $scope.setDefault = function(){

            }
            $scope.convertProduct = function(obj) {
                obj.userId = $scope.userObj.userId;
                var temp = clone(obj);
                $scope.moveProducts.push(temp);
                var json = angular.toJson($scope.moveProducts);
                console.log(json);
                $http({
                    method: "POST",
                    url: mainurl + "conversions/convertProduct",
                    headers: {
                        'Authorization': $scope.auth
                    },
                    params:{
                        products:JSON.stringify($scope.moveProducts)
                    }
                })
                .success(function(data) {
                    console.log(data.res);
                    //alert("Total "+($scope.convert.quantity * factor) + " products converted successfully!");
                    alert("conversion successfull");
                    $uibModalInstance.close();
                    $route.reload();
                })
                .error(function(err) {
                    console.log(err);
                });
            }
            $scope.cancel = function () {
                $uibModalInstance.close();
            }

        }]);
