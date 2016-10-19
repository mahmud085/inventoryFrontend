'use strict';

angular.module('inventoryAppApp')
  .controller('InventoryHoldCtrl', [ "$scope","$filter", "sharedata", "uiGridConstants", "$uibModal", "$http", "$route",
        function ($scope,$filter, sharedata, uiGridConstants, $uibModal, $http, $route) {
        $scope.mainurl = sharedata.getUrl();
        console.log("Url = ",$scope.mainurl);
        $scope.auth = sharedata.getAccessToken();
        $scope.userObj = sharedata.getUserObj();
        $scope.myInventoryHold = {};
        $scope.myInventoryHoldCopy = {};
        $scope.myInventoryHold.enableColumnResizing = true ;
        $scope.myInventoryHold = {
            enableFiltering: true,
            enableCellEdit: true,
            rowHeight: 40,
            columnDefs: [
                { name: 'salesAgent.name',
                  displayName: "Sales Agent Name",
                },  
                { name: 'product.name',
                  displayName: "Product Name",
                },
                { name: 'quantity'
                },
                { name: 'amount',
                  displayName: "Amount (tk)"      
                },
                { name: 'date'
                  // sort: {
                  //   direction: uiGridConstants.DESC,
                  //   priority: 1
                  //   }  
                }
            ]
        };
        $scope.refreshData = function() {
            var filter = "?filter[include]=product&filter[include]=salesAgent&filter[where][userId]="+$scope.userObj.userId;
            var filter1 = "?filter[include]=product&filter[include]=salesAgent&filter[where][userId]="+$scope.userObj.userId;
            if($scope.return_prod.salesagentId !== undefined && $scope.return_prod.salesagentId !== null&& $scope.return_prod.salesagentId !== ""){
                filter = filter + "&filter[where][salesagentId]="+$scope.return_prod.salesagentId;
                filter1 = filter1 + "&filter[where][salesagentId]="+$scope.return_prod.salesagentId;
            }
            if($scope.return_prod.productId !== undefined && $scope.return_prod.productId !== null&& $scope.return_prod.productId !== ""){
                filter = filter + "&filter[where][productId]="+$scope.return_prod.productId;
                //filter1 = filter1 + "&filter[where][productId]="+$scope.return_prod.productId;
            }
            if($scope.return_prod.date !== undefined && $scope.return_prod.date !== null && $scope.return_prod.date !== ""){
                filter  = filter +  "&filter[where][date]="+$scope.return_prod.date;
                filter1  = filter1 + "&filter[where][date]="+$scope.return_prod.date;
            }
            sharedata.getData("inventory_holds", filter,$scope.auth).then(function(data) {
                $scope.myInventoryHold.data = data;
                console.log("grid = ",$scope.myInventoryHold.data);
            })
            sharedata.getData("inventory_holds", filter1,$scope.auth).then(function(data) {
                 $scope.productList = data;
                 console.log("productList = ",data);
            })

            
        };
        $scope.getInventoryHold = function() {
            var filter = "?filter[include]=salesAgent&filter[include]=product&filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("inventory_holds", filter,$scope.auth).then(function(data) {
                $scope.myInventoryHold.data = data;
                $scope.myInventoryHoldCopy.data = data;
            })
        }
        $scope.getInventoryHold();
        $scope.filterByDate = function(){
            var filter = "?filter[include]=salesAgent&filter[include]=product&filter[where][userId]="+$scope.userObj.userId;
            if($scope.inventory_hold.date1 !== undefined && $scope.inventory_hold.date1 !== null && $scope.inventory_hold.date1 !== "" &&$scope.inventory_hold.date2 !== undefined && $scope.inventory_hold.date2 !== null && $scope.inventory_hold.date2 !== ""){
            filter  = filter + "&filter[where][date][between][0]="+$scope.inventory_hold.date1+"&filter[where][date][between][1]="+$scope.inventory_hold.date2;
            sharedata.getData("inventory_holds", filter,$scope.auth)
                .then(function (data) {
                    $scope.myInventoryHold.data = data;
                })
            }
        }

        $scope.productList = [];
        $scope.salesAgentList = [];
        $scope.returnProduct = [];
        $scope.return_prod = {};
        $scope.return_prod.userId = $scope.userObj.userId;
        $scope.return_prod.sell_price = 0;
        $scope.return_prod.amount = 0;
        $scope.return_prod.total = 0;
        $scope.return_prod.cash_in = 0;
        $scope.return_prod.due = 0;
        $scope.return_prod.hold = 0;
        $scope.return_prod.sold = 0;
        $scope.return_prod.returned = 0;
        $scope.return_prod.location = 'Shop';
        $scope.allreturn = {};
        $scope.allreturn.total = 0;
        $scope.allreturn.cash_in = 0;
        $scope.allreturn.discount = 0;
        $scope.allreturn.due = 0;
        $scope.showPanel = true; 
        $scope.finish = false;
        var filter = "?filter[where][userId]="+$scope.userObj.userId;
        sharedata.getData("sales_agents", filter,$scope.auth).then(function(data) {
            $scope.salesAgentList = data;
        })
        
        $scope.getPrice = function(productId) {
            $scope.return_prod.productId = productId;
            for(var i=0; i < $scope.productList.length; i++) {
                if($scope.productList[i].productId === productId) {
                    $scope.return_prod.sell_price = $scope.productList[i].product.sell_price;
                }
            }
        }
        
        $scope.calculation = function(sold ,returned) {
            $scope.return_prod.hold = $scope.return_prod.quantity - (sold + returned);
            $scope.return_prod.amount = $scope.return_prod.sell_price * ( sold );

        }
        $scope.getAmount = function() {
            $scope.return_prod.datehold = 0;
            for(var i=0; i < $scope.myInventoryHoldCopy.data.length; i++) {
                if(($scope.myInventoryHoldCopy.data[i].productId === $scope.return_prod.productId) && ($scope.myInventoryHoldCopy.data[i].salesagentId === $scope.return_prod.salesagentId)&& ($scope.myInventoryHoldCopy.data[i].date === $scope.return_prod.date)) {
                    $scope.return_prod.quantity = $scope.myInventoryHoldCopy.data[i].quantity;
                    $scope.return_prod.productName = $scope.myInventoryHoldCopy.data[i].product.name;
                    $scope.return_prod.datehold = $scope.myInventoryHoldCopy.data[i].quantity;
                }
            }
            
        }
        $scope.myReturnProduct = {};
        $scope.myReturnProduct.enableColumnResizing = true ;
        $scope.myReturnProduct.showColumnFooter = true;
        $scope.myReturnProduct.enableFiltering = true;
        $scope.myReturnProduct.enableCellEdit = true;
        $scope.myReturnProduct.rowHeight = true;
        $scope.myReturnProduct.columnDefs = [
                { name: 'productName',
                  displayName: "Product Name",
                },
                { name: 'sold'     
                },
                { name: 'returned' 
                },
                {
                    name: 'amount',
                    displayName: 'Cash',
                    aggregationType: uiGridConstants.aggregationTypes.sum
                },
                // {
                //     name: 'due',
                //     displayName: 'Due(tk)',
                //     aggregationType: uiGridConstants.aggregationTypes.sum
                // },
                {
                    name : 'location',
                    displayName : 'Loacation'
                }
            ]
        
        $scope.addReturnProd = function(obj) {
            var temp = clone(obj);
            $scope.returnProduct.push(temp);
            $scope.myReturnProduct.data.push(temp);
            $scope.setDefault();
            
        }
        $scope.convert = function(){
            $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/convertHoldProducts.html',
                controller: 'ConvertHoldProductCtrl',
                controllerAs: 'ConvertHoldProduct'
            });
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
            $scope.view1 = true;
            $scope.showPanel = false;
            $scope.finish = true;
            for(var i=0; i < $scope.returnProduct.length; i++){
                $scope.allreturn.total += $scope.returnProduct[i].amount;
                // $scope.allreturn.cash_in += $scope.returnProduct[i].cash_in;
                // $scope.allreturn.due += $scope.returnProduct[i].due ;
             }
        }
        $scope.calc = function(){
            $scope.allreturn.due = $scope.allreturn.total - ($scope.allreturn.cash_in + $scope.allreturn.discount);
        }
        $scope.confirmBuy = function(obj) {
            $scope.returnProduct.push(obj);
            var json = angular.toJson($scope.returnProduct);
                console.log(json);
                $http({
                    method: "POST",
                    url: mainurl + "inventory_holds/returnProduct",
                    headers: {
                        'Authorization': $scope.auth
                    },
                    params:{
                        products:JSON.stringify($scope.returnProduct)
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

        $scope.setDefault = function() {
            $scope.return_prod.cash_in = 0;
            $scope.return_prod.productId = "";
            $scope.return_prod.due = 0;
            $scope.return_prod.productName = "";
            $scope.return_prod.sold = 0;
            $scope.return_prod.returned = 0;
            $scope.return_prod.date = "";
            $scope.return_prod.datehold = 0;
            $scope.refreshData();
        }
        
  }]);
