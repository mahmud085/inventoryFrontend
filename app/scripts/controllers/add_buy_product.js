'use strict';

angular.module('inventoryAppApp')
    .controller('AddBuyProductCtrl', ["$scope", "sharedata", "uiGridConstants", "$uibModal", "$http", "$route",
        function ($scope, sharedata, uiGridConstants, $uibModal, $http, $route) {
            $scope.mainurl = sharedata.getUrl();
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.productList = [];
            $scope.supplierList = [];
            $scope.buyCartList = [];
            $scope.buy = {};
            $scope.transaction_buy = {};
            $scope.buy.location = "Godown";
            $scope.buy.buy_price = 0;
            $scope.buy.productName = "";
            $scope.buy.amount = 0;
            $scope.buy.quantity = 0;
            $scope.view = false;
            $scope.finish = false;
            $scope.showText = false;
            $scope.transaction_buy.sum = 0;
            $scope.transaction_buy.total = 0;
            $scope.transaction_buy.paid = 0;
            $scope.transaction_buy.dicscount = 0;
            $scope.transaction_buy.cash_out = 0;
            $scope.transaction_buy.payment_method = "Cash";
            $scope.transaction_buy.bankName = "";
            $scope.transaction_buy.checkNo = "";
            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("products", filter,$scope.auth)
                .then(function (data) {
                    $scope.productList = data;
                })
            sharedata.getData("suppliers", filter,$scope.auth)
                .then(function (data) {
                    $scope.supplierList = data;
                })
                
            $scope.getPrice = function (productId) {
                for (var i = 0; i < $scope.productList.length; i++) {
                    if ($scope.productList[i].id === productId) {
                        $scope.buy.buy_price = $scope.productList[i].buy_price;
                        $scope.buy.productName = $scope.productList[i].name;
                    }
                }
            }
            $scope.getProducts = function(supplierId){
                console.log("suppliers ID = ",supplierId);
                var filter = "?filter[where][supplierId]="+supplierId+"&filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("products", filter,$scope.auth)
                .then(function (data) {
                    console.log("Data = ",data);
                    $scope.productList = data;
                })
            }
            $scope.getAmount = function (quantity, price) {
                $scope.buy.amount = quantity * price;
            }
            $scope.checkAccount = function () {
                if($scope.transaction_buy.payment_method === "Bank")
                  $scope.showText = true;
                else
                  $scope.showText = false;
            }
            $scope.setDefault = function() {
                $scope.buy.quantity = 0;
                $scope.buy.amount = 0;
                $scope.buy.buy_price = 0;
                $scope.buy.productId = "";
            }

            $scope.addCart = function (obj) {
                var temp = clone(obj);
                $scope.buyCartList.push(temp);
                $scope.myBuyCartList.data.push(temp);
                console.log("buycartList" + JSON.stringify($scope.buyCartList));
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

            $scope.myBuyCartList = {};
            $scope.myBuyCartList.enableFiltering = true;
            $scope.myBuyCartList.rowHeight = 40;
            $scope.myBuyCartList.enableColumnResizing = true;
            $scope.myBuyCartList.showColumnFooter = true;
            $scope.myBuyCartList.columnDefs = [
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
                    name: 'buy_price',
                    displayName: 'Buy Price',
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
                    //aggregationType: uiGridConstants.aggregationTypes.sum,
                    enableCellEdit: false
                },
                {
                    name: 'Action',
                    enableFiltering: false,
                    cellEditableCondition: false,
                    cellTemplate: 'views/buttons.html'

                }
            ]
            
            $scope.show = function () {
                $scope.view = true;
                $scope.finish = true;
                for(var i=0; i < $scope.buyCartList.length; i++){
                    $scope.transaction_buy.sum += $scope.buyCartList[i].amount;
                }
                $scope.transaction_buy.total = $scope.transaction_buy.sum;
            }
            
            $scope.getDiscountedTotal = function(discount, amount){
                discount = (discount === undefined)? 0 : discount;
                $scope.transaction_buy.total = amount -  discount ;
            }
            
            $scope.confirmBuy = function(obj) {
                obj.userId = $scope.userObj.userId;
                $scope.buyCartList.push(obj);
                var json = angular.toJson($scope.buyCartList);
                console.log(json);
                $http({
                    method: "POST",
                    url: mainurl + "buys/updateInventoryBuy",
                    headers : {
                        'Authorization': $scope.auth
                    },
                    params:{
                        product_list:JSON.stringify($scope.buyCartList)
                    }
                })
                .success(function(data) {
                    console.log(data.res);
                    $route.reload();
                })
                .error(function(err) {
                    console.log(err);
                });
            }
            
            $scope.editData = function (row) {
                $scope.row = row.entity;
                console.log($scope.row);
                $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/edit_buy_product.html',
                    controller: 'EditBuyProductCtrl',
                    controllerAs: 'editbuyproduct',
                    resolve: {
                        row: function () {
                            return $scope.row;
                        },
                        cartList: function(){
                            return $scope.buyCartList;
                        }
                    }
                });
            }

            $scope.deleteData = function (row) {
                alert("Do you Really want to DELETE this !!!! ");
                for(var i=0; i < $scope.buyCartList.length; i++) {
                    if($scope.buyCartList[i].productId === row.entity.productId) {
                        $scope.buyCartList.splice(i, 1);
                        $scope.myBuyCartList.data.splice(i, 1);
                    }
                }
            }

        }]);
 