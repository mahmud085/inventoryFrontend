'use strict';

angular.module('inventoryAppApp')
  .controller('CatagoryCtrl', [ "$scope", "$http","sharedata", "$uibModal", 
      function ($scope,$http,sharedata, $uibModal) {
         
         $scope.myCatagory = {} ;
         $scope.auth = sharedata.getAccessToken();
         $scope.userObj = sharedata.getUserObj();
         $scope.myCatagory.enableFiltering = true ;
         $scope.myCatagory.rowHeight = 40;
         $scope.myCatagory.enableColumnResizing = true ;
         $scope.myCatagory.columnDefs = [
             {
                 name: 'name', 
                 displayName: 'Category', 
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
        $scope.getCategories =function(){
            var filter = "?filter[where][userId]="+$scope.userObj.userId;
            sharedata.getData("categories", filter,$scope.auth).then(function(data) {
                $scope.myCatagory.data = data;
            });
        }
        $scope.getCategories();
         
         $scope.editData = function(row){
            $scope.row = row.entity;
            $uibModal.open({
                templateUrl: 'views/editCategory.html',
                controller: 'EditcategoryCtrl'  ,
                controllerAs: 'editcategory',
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
                sharedata.deleteData(row.entity, "categories",$scope.auth);
             }
         }
         
         
  }]);
