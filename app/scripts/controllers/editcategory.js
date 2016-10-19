'use strict';

angular.module('inventoryAppApp')
    .controller('EditcategoryCtrl', ["$scope", "sharedata", "row", "$uibModalInstance",
        function ($scope, sharedata, row, $uibModalInstance) {
            $scope.auth = sharedata.getAccessToken();
            $scope.category = {};
            $scope.category.name = row.name;
            $scope.category.id = row.id;
            $scope.editCategory = function (category) {
                sharedata.edit(category, "categories",$scope.auth);
                $uibModalInstance.close();
            }

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }
        }]);
  