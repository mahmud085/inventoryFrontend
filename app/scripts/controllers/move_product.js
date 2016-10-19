'use strict';

angular.module('inventoryAppApp')
    .controller('MoveProductCtrl', ["$scope", "sharedata", "$route", "$http","$uibModalInstance",
        function ($scope, sharedata, $route, $http,$uibModalInstance) {
            $scope.mainurl = sharedata.getUrl();
            console.log("Url = ",$scope.mainurl);
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.moveProducts = [];
            $scope.move = {};
            $scope.move.productId = "";
            $scope.move.productName = "";
            $scope.move.available_quantity = 0;
            $scope.move.quantity = 0;
            $scope.inventoryList = [];
            $scope.invalid = false

            var filter = "?filter[include]=products" + "&filter[where][location]=Godown&filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("inventories", filter,$scope.auth)
                .then(function (data) {
                    $scope.inventoryList = data;
                })

            $scope.getQuantity = function (productId) {
                for (var i = 0; i < $scope.inventoryList.length; i++) {
                    if ($scope.inventoryList[i].productId === productId) {
                        $scope.move.available_quantity = $scope.inventoryList[i].available_amount;
                        $scope.move.productName = $scope.inventoryList[i].products.name;
                    }
                }
            }
            $scope.calculate = function(available_quantity,quantity){
                if(quantity>available_quantity){
                  //  alert("Not available products to move!");
                   // $scope.setDefault();
                   $scope.invalid = true ;
                } else {
                     $scope.invalid = false ;
                }
            }
           
            $scope.myMoveProducts = {};
            $scope.myMoveProducts.enableFiltering = true;
            $scope.myMoveProducts.rowHeight = 40;
            $scope.myMoveProducts.enableColumnResizing = true;
            $scope.myMoveProducts.columnDefs = [
                {
                    name: 'productName',
                    displayName: 'Product Name',
                    enableCellEdit: false,
                    width: 150
                },
                {
                    name: 'quantity',
                    displayName: 'Quantiy',
                    enableCellEdit: false
                }

            ]
            
            $scope.add = function(obj) {
                var temp = clone(obj);
                $scope.moveProducts.push(temp);
                $scope.myMoveProducts.data.push(temp);
                $scope.setDefault();
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
                $scope.move.productName = "";
                $scope.move.productId = "";
                $scope.move.available_quantity = 0;
                $scope.move.quantity = 0;
            }
            $scope.moveToShop = function(obj) {
                obj.userId = $scope.userObj.userId;
                var temp = clone(obj);
                $scope.moveProducts.push(temp);
                var json = angular.toJson($scope.moveProducts);
                console.log(json);
                $http({
                    method: "POST",
                    url: mainurl + "inventories/moveToShop",
                    headers : {
                        'Authorization': $scope.auth
                    },
                    params:{
                        products:JSON.stringify($scope.moveProducts)
                    }
                })
                .success(function(data) {
                    console.log(data.res);
                    $scope.myMoveProducts.data = [];
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
