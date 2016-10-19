'use strict';

angular.module('inventoryAppApp')
    .controller('AddHoldProductCtrl', ["$scope", "sharedata", "uiGridConstants", "$uibModal", "$http", "$route",
        function ($scope, sharedata, uiGridConstants, $uibModal, $http, $route) {
            $scope.mainurl = sharedata.getUrl();
            console.log("Url = ",$scope.mainurl);
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.hold = {};
            $scope.obj = {};
            $scope.obj.total = 0;
            $scope.obj.location = "";
            $scope.holdCartList = [];
            $scope.hold.salesagentId = "";
            $scope.hold.productId = "";
            $scope.hold.userId = $scope.userObj.userId;
            $scope.hold.productName = "";
            $scope.hold.sell_price = 0;
            $scope.hold.aval_quant = 0;
            $scope.hold.amount = 0;
            $scope.hold.location = "Godown";
            $scope.salesagentList = [];
            $scope.productList = [];
            $scope.inventoryList = [];
            $scope.view = false;
            $scope.invalid = false ;
            $scope.finish = true;

            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("sales_agents", filter,$scope.auth).then(function (data) {
                $scope.salesagentList = data;
            })

            sharedata.getData("products", filter,$scope.auth).then(function (data) {
                $scope.productList = data;
            })


            $scope.getAmount = function (available_quantity,quantity) {
                
                if(quantity>available_quantity){
                   $scope.invalid = true ;
                } else {
                     $scope.invalid = false ;
                }

                for (var i = 0; i < $scope.productList.length; i++) {
                    if ($scope.productList[i].id === $scope.hold.productId) {
                        $scope.hold.sell_price = $scope.productList[i].sell_price;
                        $scope.hold.productName = $scope.productList[i].name;
                    }
                }
                $scope.hold.amount = $scope.hold.sell_price * quantity;
            }
            $scope.getQuantity = function(location,productId){
                $scope.hold.aval_quant = 0;
                var filter = "?filter[where][productId]=" + productId +"&filter[where][location]="+location+"&filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("inventories", filter,$scope.auth).then(function(data) {
                    $scope.hold.aval_quant = data[0].available_amount;
                }); 
            }
            $scope.calculate = function(available_quantity,quantity){

            }
            $scope.myHoldCartList = {};
            $scope.myHoldCartList.enableFiltering = true;
            $scope.myHoldCartList.rowHeight = 40;
            $scope.myHoldCartList.enableColumnResizing = true;
            $scope.myHoldCartList.showColumnFooter = true;
            $scope.myHoldCartList.columnDefs = [
                {
                    name: 'productName',
                    displayName: 'Product Name',
                    enableCellEdit: false,
                    cellTooltip: true,
                    headerTooltip: true,
                    width: 150,
                    enableFiltering: false
                },
                {
                    name: 'quantity',
                    displayName: 'Quantiy',
                    cellTooltip: true,
                    headerTooltip: true,
                    enableCellEdit: false
                },
                {
                    name: 'sell_price',
                    displayName: 'Sell Price',
                    cellTooltip: true,
                    headerTooltip: true,
                    enableCellEdit: false
                },
                {
                    name: 'amount',
                    displayName: 'Amount(tk)',
                    cellTooltip: true,
                    headerTooltip: true,
                    width: 100,
                    aggregationType: uiGridConstants.aggregationTypes.sum,
                    enableCellEdit: false
                },
                {
                    name: 'Action',
                    enableFiltering: false,
                    cellEditableCondition: false,
                    cellTemplate: 'views/buttons.html'

                }
            ]
            
            $scope.addhold = function (obj) {
                var temp = clone(obj);
                $scope.holdCartList.push(temp);
                $scope.myHoldCartList.data.push(temp);
                console.log("holdcartList" + JSON.stringify($scope.holdCartList));
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
                $scope.hold.quantity = 0;
                $scope.hold.amount = 0;
                $scope.hold.sell_price = 0;
                $scope.hold.productId = "";
            }
            
            $scope.show = function() {
                $scope.view = true;
                 $scope.finish = false;
                for(var i=0; i < $scope.holdCartList.length; i++) {
                    $scope.obj.total += $scope.holdCartList[i].amount
                }
            }
            
            $scope.confirm = function(obj) {
                
                var json = angular.toJson($scope.holdCartList);
                console.log(json);
                $http({
                    method: "POST",
                    url: mainurl + "inventory_holds/updateInventoryHold",
                    headers: {
                        'Authorization': $scope.auth
                    },
                    params:{
                        products:JSON.stringify($scope.holdCartList)
                    }
                })
                .success(function(data) {
                    console.log("add hold data "+data.res);
                    $route.reload();
                })
                .error(function(err) {
                    console.log(err);
                });
            }
            
            $scope.editData = function (row) {
                $scope.row = row.entity;
                $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/edit_hold_product.html',
                    controller: 'EditHoldProductCtrl',
                    controllerAs: 'editholdproduct',
                    resolve: {
                        row: function () {
                            return $scope.row;
                        },
                        cartList: function(){
                            return $scope.holdCartList;
                        }
                    }
                });
            }

            $scope.deleteData = function (row) {
                alert("Do you Really want to DELETE this !!!! ");
                for(var i=0; i < $scope.sellCartList.length; i++) {
                    if($scope.sellCartList[i].productId === row.entity.productId) {
                        $scope.sellCartList.splice(i, 1);
                        $scope.mySellCartList.data.splice(i, 1);
                    }
                }
            }

        }]);
