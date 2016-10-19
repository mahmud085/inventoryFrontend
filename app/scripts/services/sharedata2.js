'use strict';

/**
 * @ngdoc service
 * @name inventoryAppApp.sharedata2
 * @description
 * # sharedata2
 * Service in the inventoryAppApp.
 */
angular.module('inventoryAppApp')
  .service('sharedata2', [ "$rootScope", function ($rootScope) {
      var data = {};
      
      data.title = data.supplier = data.catagory = data.unit = data.price = "";

        data.prepForBroadCast = function (id, title, supplier, catagory, unit, price ) {
            this.id = id;
            this.title = title;
            this.supplier = supplier;
            this.catagory = catagory;
            this.unit = unit;
            this.price = price;
            this.broadCastItem();
        };
        
        data.broadCastItem = function(){
            $rootScope.$broadcast("saveProduct");
        };
    
  
      
      return data;
        
  }]);
