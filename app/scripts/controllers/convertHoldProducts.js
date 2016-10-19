'use strict';

angular.module('inventoryAppApp')
    .controller('ConvertHoldProductCtrl', ["$scope", "sharedata","$uibModalInstance","$route","$http",
        function ($scope, sharedata,$uibModalInstance,$route,$http) {
            $scope.mainurl = sharedata.getUrl();
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.salesagentList = [];
            $scope.convert = {};
            $scope.convert.salesagentId = "";
            $scope.convert.userId = $scope.userObj.userId;
            $scope.convert.start_productId = "";
            $scope.convert.date = "";
            $scope.convert.quantity = 0;
            $scope.convert.available_quantity = 0;
            $scope.holdproductsList = [];
            $scope.endProductsList = [];
            $scope.moveProducts = [];
            $scope.invalid = false;

            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("sales_agents", filter,$scope.auth).then(function (data) {
                $scope.salesagentList = data;
            })
            $scope.getHoldProducts = function(){
	            var filter = "?filter[include]=salesAgent&filter[include]=product&filter[where][salesagentId]="+ $scope.convert.salesagentId
	            + "&filter[where][date]="+$scope.convert.date+"&filter[where][userId]="+$scope.userObj.userId;
	            sharedata.getData("inventory_holds",filter,$scope.auth).then(function(data){
	            	console.log("Hold Data = ",data);
	            	$scope.holdproductsList = data;
	            })
	        }
            $scope.getQuantity = function(start_productId,date){
                if(start_productId === "")
                 $scope.convert.available_quantity = 0;
                 else{   
                    for (var i = 0; i < $scope.holdproductsList.length; i++) {
                        if ($scope.holdproductsList[i].productId === $scope.convert.start_productId && $scope.holdproductsList[i].date === $scope.convert.date) {
                            $scope.convert.available_quantity = $scope.holdproductsList[i].quantity;
                            console.log("aq = ",$scope.convert.available_quantity);
                        }
                    }
                }
            }
	        $scope.getEndProducts = function(start_productId){
                var filter = "?filter[include]=end_product" + "&filter[where][start_productId]="+start_productId+"&filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("conversions", filter,$scope.auth)
                    .then(function (data) {
                        console.log("end product ",data);
                        $scope.endProductsList = data;
                    })


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
                for (var i = 0; i < $scope.endProductsList.length; i++) {
                    if ($scope.endProductsList[i].end_productId === end_productId) {
                        $scope.convert.sell_price = $scope.endProductsList[i].end_product.sell_price;
                    }
                }
            }
            function clone(obj) {
                if (null == obj || "object" != typeof obj) return obj;
                var copy = obj.constructor();
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
                }
                return copy;
            }
            $scope.convertProduct = function(obj) {

                var temp = clone(obj);
                $scope.moveProducts.push(temp);
                var json = angular.toJson($scope.moveProducts);
                console.log(json);
                $http({
                    method: "POST",
                    url: mainurl + "conversions/convertHoldProduct",
                    headers: {
                        'Authorization': $scope.auth
                    },
                    params:{
                        products:JSON.stringify($scope.moveProducts)
                    }
                })
                .success(function(data) {
                    console.log(data.res);
                    $uibModalInstance.close();
                    $route.reload();
                })
                .error(function(err) {
                    console.log(err);
                });
            }
            $scope.getDefault = function(){
                $scope.convert.salesagentId = "";
                $scope.convert.start_productId = "";
                $scope.convert.end_productId = "";
                $scope.convert.date = "";
                $scope.convert.quantity = 0;
                $scope.convert.available_quantity = "";
                $scope.convert.total = "";

            }
            $scope.cancel = function () {
                $uibModalInstance.close();
            }

        }]);
