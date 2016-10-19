'use strict';

angular.module('inventoryAppApp')
  .controller('orderCtrl', [ "$scope", "$http","sharedata", "$uibModal", 
      function ($scope,$http,sharedata, $uibModal) {
         
         $scope.myOrder = {} ;
         $scope.auth = sharedata.getAccessToken();
         $scope.userObj = sharedata.getUserObj();
         $scope.myOrder.enableFiltering = true ;
         $scope.myOrder.rowHeight = 40;
         $scope.myOrder.enableColumnResizing = true ;
         $scope.myOrder.columnDefs = [
            {   
                name: 'products.name',
                displayName: "Product Name",
            },
            {   
                name: 'customers.name',
                displayName: "Customer Name",
            },
            {
                name: 'quantity', 
                displayName: 'Quantity', 
                enableCellEdit: false 
            }, 
            {
                name: 'status', 
                displayName: 'Status', 
                enableCellEdit: false 
            },                               
            {
                name: 'date', 
                displayName: 'Date', 
                enableCellEdit: false 
            },
            {
                name: 'description', 
                displayName: 'Description', 
                enableCellEdit: false 
            },
            {
                name: 'Action',
                enableFiltering: false,    
                cellEditableCondition: false, 
                cellTemplate: 'views/buttons.html'      
                       
            }
         ]
         
         //calling sharedata's getData function by providing model name and filter as arguments
        $scope.getOrders =function(){
            var filter = "?filter[include]=products&filter[include]=customers&filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("orders", filter,$scope.auth).then(function(data) {
                $scope.myOrder.data = data;
            });
        }
        $scope.getOrders();
         
         $scope.editData = function(row){
            $scope.row = row.entity;
            $uibModal.open({
                templateUrl: 'views/editorder.html',
                controller: 'EditOrderCtrl'  ,
                controllerAs: 'editorder',
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
                sharedata.deleteData(row.entity, "orders",$scope.auth);
             }
         }
         
         
  }]);
