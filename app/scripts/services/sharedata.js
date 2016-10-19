'use strict';
//var mainurl = "http://162.243.206.252/api/";
var mainurl = "http://0.0.0.0:3000/api/";
angular.module('inventoryAppApp')
    .factory('sharedata', ["$http", "$route", '$cookies', '$cookieStore',
     function ($http, $route, $cookies, $cookieStore) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var share = {};
        var tempList = [];
        var url = "";

        share.getUrl = function(){
          return url = mainurl;   
        }
        var loggedIn;
        share.setLogin = function(value){
            loggedIn = value;
        }
        share.getLogin = function(){
            return loggedIn;
        }
        share.getUserObj = function(){
            console.log("inside share userobj ",$cookieStore.get('userObj'));
            return $cookieStore.get('userObj');
        }

        share.getAccessToken = function(){
            console.log("inside share accessToken = "+$cookieStore.get("accessToken"));
            share.accessToken = $cookieStore.get("accessToken");
            return share.accessToken;
        }
        share.getData = function (model, filter,auth) {
            console.log("get url = " + mainurl + model + filter);
            var promise = $http({
                    method: "GET",
                    url: mainurl + model + filter,
                    headers: {
                        'Authorization': auth
                    }
                })
                .then(function (responce) {
                    //console.log(responce);
                    tempList = responce.data;
                    console.log("inside service success " +model+ " Data " +tempList);
                    return tempList;
                }
                , function(err) {
                    //console.log(err);
                });
            return promise;
        }

        share.postData = function (obj, model,auth) {
            console.log("post url = " + mainurl + model);
            var promise = $http({
                method:"POST",
                url : mainurl + model,
                data : JSON.stringify(obj),
                headers : {
                    'Authorization':auth
                }
            })
            .then(function (response) {
                //console.log("Successfully " + model + " Added");
                $route.reload();
                return response ;
            },
            function (err) {
                console.log(err);
                return err ;
            })
            return promise ;
        }

        share.edit = function (obj, model,auth) {
            var promise = $http({
                method: "PUT",
                url: mainurl + model + "/" + obj.id,
                data: JSON.stringify(obj),
                headers: {
                    'Authorization': auth
                }
            })
            .then(function (response) {
                console.log("Successfully " + model + " Edited");
                $route.reload();
                return response.data;
            }
            , function (err) {
                //console.log(err);
                return err;
            });
            return promise;
        }

        share.deleteData = function (obj, model,auth) {
            $http({
                method: "DELETE",
                url: mainurl + model + "/" + obj.id,
                headers: {
                    'Authorization': auth
                }
            })
            .success(function (data) {
                console.log("Successfully" + model + "Deleted");
                $route.reload();
            })
            .error(function (err) {
                console.log(err);
            })
        }



        return share;
    }]);
