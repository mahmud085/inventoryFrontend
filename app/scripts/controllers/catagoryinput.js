'use strict';

angular.module('inventoryAppApp')
    .controller('CatagoryinputCtrl', ["sharedata", "$scope", function (sharedata, $scope) {
            $scope.auth = sharedata.getAccessToken();
            $scope.userObj = sharedata.getUserObj();
            $scope.category = {}
            
            $scope.addCatagory = function (category) {
            	category.userId = $scope.userObj.userId;
                sharedata.postData(category, "categories",$scope.auth);
            }
    }]);
