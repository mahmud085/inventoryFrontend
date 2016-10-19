'use strict';

/**
 * @ngdoc function
 * @name inventoryAppApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the inventoryAppApp
 */
angular.module('inventoryAppApp')
  .controller('SigninCtrl',["$scope", "sharedata","$http","$location", '$cookies', '$cookieStore',
  		 function ($scope, sharedata,$http,$location, $cookies, $cookieStore) {
  		 	var mainurl = sharedata.getUrl();
  		 	console.log("main url = ",mainurl);
  		 	$scope.signup = {};
  		 	$scope.signin = {};
  		 	$scope.show1 = true;
  		 	$scope.show = false;
  		 	$scope.error = false;
  		 	$scope.success = false;
  		 	$scope.error = false;
  		 	$scope.showOrHide = function(){
  		 		$scope.show1 = true;
  		 		$scope.show = false;
  		 	}
  		 	$scope.showOrHide2 = function(){
  		 		$scope.show1 = false;
  		 		$scope.show = true;
  		 	}
  		 	$scope.refreshData = function(){
  		 		$scope.signup.username = "";
  		 		$scope.signup.password = "";
  		 		$scope.signup.email = "";
  		 		$scope.signup.conpass = "";
  		 		$scope.signin.email="";
  		 		$scope.signin.password="";
  		 	}
  		 	$scope.refreshData();
  		 	$scope.signupuser = function(signup){
  		 		//sharedata.postData(signup,"users");
	  		 	$http({
	                method: "POST",
	                url: mainurl + "users",
	                data: JSON.stringify(signup)
	            })
	            .success(function (data) {
	                console.log("Successfully " + "users" + " Added");
	                $scope.success = true;
	                $scope.refreshData();
	                $route.reload();
	            })
	            .error(function (err) {
	                console.log(err);
	                $scope.error = true;
	                $scope.errmsg = err.error.message;

	            })
  		 	}
  		 	$scope.signinuser = function(signin){
  		 		//sharedata.postData(signup,"users");
	  		 	$http({
	                method: "POST",
	                url: mainurl + "users/login",
	                data: JSON.stringify(signin)
	            })
	            .success(function (data) {
	                console.log("Successfully " + "users" + " login data = ",data);
	                $cookieStore.put('userObj',data);
	                $cookieStore.put("accessToken",data.id);
	                $scope.refreshData();
	               	$location.path('/products');
	            })
	            .error(function (err) {
	                console.log(err);
	                $scope.error = true;
	            })
  		 	}
  }]);
