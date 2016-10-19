'use strict';

angular.module('inventoryAppApp')
  .controller('ProductsCtrl', [  "$scope", "$http","sharedata", "$uibModal","$cookieStore","$location",
            function ( $scope,$http ,sharedata, $uibModal,$cookieStore,$location) {
       $scope.myProducts = {};
       $scope.auth = sharedata.getAccessToken();
       $scope.userObj = sharedata.getUserObj();
        $scope.myProducts = {
            enableFiltering: true,
            enableCellEdit: true,
            enableColumnResizing: true,
            rowHeight: 40,
            columnDefs: [
                { name: 'name',
                  cellTooltip: true, 
                  headerTooltip: true 
                },
                { name: 'category.name',
                  displayName: "Category Name",
                  cellTooltip: true, 
                  headerTooltip: true    
                },
                { name: 'supplier.name',
                  displayName: "Supplier Name",
                  cellTooltip: true, 
                  headerTooltip: true   
                },
                {
                  name: 'sku_number',
                  displayName: 'Sku Number',
                  cellTooltip: true, 
                  headerTooltip: true 
                },
                 {
                  name: 'buy_price',
                  displayName: 'Buy Price',
                  cellTooltip: true, 
                  headerTooltip: true
                },
                 {
                  name: 'sell_price',
                  displayName: 'Sell Price',
                  cellTooltip: true, 
                  headerTooltip: true 
                },
                { name: 'description',
                  cellTooltip: true, 
                  headerTooltip: true   
                },
                { name: 'Action',
                  enableFiltering: false,
                  cellEditableCondition: false, 
                  cellTemplate: 'views/buttons.html'      
                },
                { name: 'History',
                  enableFiltering: false,
                  cellEditableCondition: false, 
                  cellTemplate: 'views/button_history.html'      
                } 
            ]
        };
       //calling sharedata's getData function providing 2 argument model name and filter
       $scope.getProducts = function(){
           var filter = "?filter[include]=category&filter[include]=supplier&filter[where][userId]="+$scope.userObj.userId ;
           sharedata.getData("products", filter,$scope.auth)
                .then( function(data) {
                    $scope.myProducts.data = data;
                })   
       }
       $scope.getProducts();
       
       $scope.showHistory = function(row){
           $scope.row = row.entity;
            $uibModal.open({
                templateUrl: 'views/product_history.html',
                controller: 'ProductHistoryCtrl'  ,
                controllerAs: 'productHistory',
                size: 'md',
                resolve: {
                    row: function () {
                        return $scope.row; 
                        }
                }
            });
       }
         
        $scope.editData = function(row){
            $scope.row = row.entity;
            $uibModal.open({
                templateUrl: 'views/editProduct.html',
                controller: 'EditCtrl'  ,
                controllerAs: 'edit',
                size: 'lg',
                resolve: {
                    row: function () {
                        return $scope.row; 
                        }
                }
            });
        }

        $scope.deleteData = function(row){
          var r = confirm("Do you Really want to DELETE this !!!! ");
          if(r){
             sharedata.deleteData(row.entity, "products",$scope.auth);
          }
            
         }
         
  }]);

