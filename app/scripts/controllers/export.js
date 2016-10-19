'use strict';
angular.module('inventoryAppApp')
.controller('exportCtrl',['$scope','sharedata','$http','$route',function($scope,sharedata,$http,$route){
	$scope.exportData = "Choose Data to export";
	$scope.auth = sharedata.getAccessToken();
	$scope.userObj = sharedata.getUserObj();
	$scope.success = false;
	console.log($scope.exportData);
	$scope.changeOption = function(){
		if($scope.exportData === 'Buy'){
			$scope.modelname = 'buy';
			$scope.modelname1 = 'buys';
		}
		if($scope.exportData === 'Sell'){
			$scope.modelname = 'sell';
			$scope.modelname1 = 'sells';
		}
		if($scope.exportData === 'Inventory'){
			$scope.modelname = 'inventory';	
			$scope.modelname1 = 'inventories';	
		}
		if($scope.exportData === 'Category'){
			$scope.modelname = 'category';
			$scope.modelname1 = 'categories';
		}
		if($scope.exportData === 'Customer'){
			$scope.modelname = 'customer';
			$scope.modelname1 = 'customers';
		}
		if($scope.exportData === 'Sales Agent'){
			$scope.modelname = 'sales_agent';
			$scope.modelname1 = 'sales_agents';	
		}
		if($scope.exportData === 'Supplier'){
			$scope.modelname = 'supplier';
			$scope.modelname1 = 'suppliers';
		}
		if($scope.exportData === 'Inventory Hold'){
			$scope.modelname = 'inventory_hold';
			$scope.modelname1 = 'inventory_holds';
		}
		if($scope.exportData === 'Cash Flow'){
			$scope.modelname = 'cash_flow';
			$scope.modelname1 = 'cash_flows';	
		}
		if($scope.exportData === 'Conversion'){
			$scope.modelname = 'conversion';
			$scope.modelname1 = 'conversions';	
		}
		if($scope.exportData === 'Transaction Buy'){
			$scope.modelname = 'transaction_buy';
			$scope.modelname1 = 'transaction_buys';
		}
		if($scope.exportData === 'Transaction Sell'){
			$scope.modelname = 'transaction_sell';
			$scope.modelname1 = 'transaction_sells';
		}
		if($scope.exportData === 'Product'){
			$scope.modelname = 'product';
			$scope.modelname1 = 'products';									
		}
		console.log($scope.modelname);
	}
	$scope.dataExport = function(){
		console.log("here dataExport");
		$scope.dataObj = {};
        $scope.dataObj.fieldname = $scope.modelname;
        $scope.dataObj.userId = $scope.userObj.userId;
        $http({
            method: "POST",
            url: mainurl + $scope.modelname1+"/exportImport",
            headers : {
                'Authorization': $scope.auth
            },
            params:{
                data:JSON.stringify($scope.dataObj)
            }
        })
        .success(function(data) {
            console.log("success respons ",data);
            //$scope.success = true;
            alert("successfully exported data!");
            $route.reload();
        })
        .error(function(err) {
            console.log(err);
            alert("something went wrong while exported data!");
        });
	}
}]);