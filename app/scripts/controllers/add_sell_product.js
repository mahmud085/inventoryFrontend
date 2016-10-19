'use strict';

angular.module('inventoryAppApp')
    .controller('AddSellProductCtrl', ["$scope", "sharedata", "uiGridConstants", "$uibModal", "$http", "$route",
        function ($scope, sharedata, uiGridConstants, $uibModal, $http, $route) {
            
            $scope.mainurl = sharedata.getUrl();
           // console.log("Url = ",$scope.mainurl);
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.sell = {};
            $scope.transaction_sell = {};
            $scope.productList = [];
            $scope.customerList = [];
            $scope.sellCartList = [];
            $scope.sell.amount = 0;
            $scope.transaction_sell.discount = 0;
            $scope.transaction_sell.paid = 0;
            $scope.sell.location = "Shop";
            $scope.view = false;
            $scope.transaction_sell.sum = 0;
            $scope.transaction_sell.payment_method = "Cash";
            $scope.transaction_sell.bankName = "";
            $scope.transaction_sell.checkNo = "";
            $scope.sell.customerId = "";
            $scope.sell.aval_quant = 0;
            $scope.invalid = false;
            $scope.finish = false;
            $scope.showText = false;
            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("products", filter,$scope.auth)
                .then(function (data) {
                    $scope.productList = data;
                })

            sharedata.getData("customers", filter,$scope.auth)
                .then(function (data) {
                    $scope.customerList = data;
                })
            
            
            $scope.getPrice = function(productId,location){
                for(var i=0; i < $scope.productList.length; i++) {
                    if($scope.productList[i].id === productId){
                        $scope.sell.sell_price = $scope.productList[i].sell_price;
                        $scope.sell.productName = $scope.productList[i].name;
                    }
                }
                $scope.sell.aval_quant = 0;
                var filter = "?filter[where][productId]=" + productId +"&filter[where][location]="+location+"&filter[where][userId]="+$scope.userObj.userId;
                sharedata.getData("inventories", filter,$scope.auth).then(function(data) {
                    $scope.sell.aval_quant = data[0].available_amount;
                });
            }
            $scope.checkAccount = function () {
                if($scope.transaction_sell.payment_method === "Bank")
                  $scope.showText = true;
                else
                  $scope.showText = false;
            }
            $scope.getDiscountedTotal = function(discount, amount){
                discount = (discount === undefined)? 0 : discount;
                $scope.transaction_sell.total = amount -  discount ;
            }
            
            $scope.getAmount = function(quantity, price,aval_quant){
                $scope.sell.amount = quantity * price;
                if(quantity>aval_quant){
                   $scope.invalid = true ;
                } else {
                     $scope.invalid = false ;
                }
            }
            
            $scope.setDefault = function(){
                $scope.sell.quantity = 0;
                $scope.sell.amount = 0;
                $scope.sell.sell_price = 0;
                $scope.sell.productId = "";
                $scope.sell.aval_quant = 0;
            }
            
            $scope.addCart = function(obj){
                var temp = clone(obj);
                $scope.sellCartList.push(temp);
                $scope.mySellCartList.data.push(temp);
                console.log("cartList" + JSON.stringify($scope.sellCartList));
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
                    
            $scope.show = function () {
                $scope.view = true;
                $scope.finish = true;
                for(var i=0; i < $scope.sellCartList.length; i++){
                    $scope.transaction_sell.sum += $scope.sellCartList[i].amount;
                }
                $scope.transaction_sell.total = $scope.transaction_sell.sum;
            }
            
            $scope.mySellCartList = {} ;
            $scope.mySellCartList.enableFiltering = true ;
            $scope.mySellCartList.rowHeight = 40;
            $scope.mySellCartList.enableColumnResizing = true ;
            $scope.mySellCartList.showColumnFooter = true;
            $scope.mySellCartList.columnDefs = [
                {
                    name: 'productName', 
                    displayName: 'Product Name' , 
                    enableCellEdit: false,
                    cellTooltip: true, 
                    headerTooltip: true ,
                    width: 150,  
                    enableFiltering: false  
                    },
                {
                    name: 'quantity', 
                    displayName: 'Quantiy', 
                    cellTooltip: true, 
                    headerTooltip: true ,
                    enableCellEdit: false 
                    },
               {
                    name: 'sell_price', 
                    displayName: 'Sell Price', 
                    cellTooltip: true, 
                    headerTooltip: true ,
                    enableCellEdit: false 
                    },
               {
                    name: 'amount', 
                    displayName: 'Amount(tk)', 
                    cellTooltip: true, 
                    headerTooltip: true ,
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
            
            $scope.confirmSell = function(obj) {
                obj.userId = $scope.userObj.userId;
                $scope.sellCartList.push(obj);
                var json = angular.toJson($scope.sellCartList);
                console.log(json);
                $http({
                    method: "POST",
                    url: mainurl + "sells/updateInventorySell",
                    headers : {
                        'Authorization': $scope.auth
                    },
                    params:{
                        product_list:JSON.stringify($scope.sellCartList)
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
                $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/edit_sell_product.html',
                    controller: 'EditSellProductCtrl',
                    controllerAs: 'editsellproduct',
                    resolve: {
                        row: function () {
                            return $scope.row;
                        },
                        cartList: function(){
                            return $scope.sellCartList;
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
 