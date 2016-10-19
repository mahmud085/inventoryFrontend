'use strict';

/**
 * @ngdoc overview
 * @name inventoryAppApp
 * @description
 * # inventoryAppApp
 *
 * Main module of the application.
 */
angular
  .module('inventoryAppApp', [ 
    'ui.grid.resizeColumns',  
    'ui.bootstrap',  
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-loading-bar',
    '720kb.datepicker'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/homepage.html',
        controller: 'SigninCtrl',
        controllerAs: 'signin'
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'products',
        authenticated: true
      })
      .when('/category', {
        templateUrl: 'views/catagory.html',
        controller: 'CatagoryCtrl',
        controllerAs: 'catagory',
        authenticated: true
      })
      .when('/categoryinput', {
        templateUrl: 'views/catagoryinput.html',
        controller: 'CatagoryinputCtrl',
        controllerAs: 'catagoryinput'
      })
      .when('/addProduct', {
        templateUrl: 'views/addproduct.html',
        controller: 'AddproductCtrl',
        controllerAs: 'addProduct'
      })
      .when('/suppliers', {
        templateUrl: 'views/suppliers.html',
        controller: 'SuppliersCtrl',
        controllerAs: 'suppliers'
      })
      .when('/customers', {
        templateUrl: 'views/customers.html',
        controller: 'CustomersCtrl',
        controllerAs: 'customers'
      })
      .when('/addUnits', {
        templateUrl: 'views/addunits.html',
        controller: 'AddunitsCtrl',
        controllerAs: 'addUnits'
      })
      .when('/salesAgent', {
        templateUrl: 'views/salesagent.html',
        controller: 'SalesagentCtrl',
        controllerAs: 'salesAgent'
      })
      .when('/conversion', {
        templateUrl: 'views/conversion.html',
        controller: 'ConversionCtrl',
        controllerAs: 'conversion'
      })
      .when('/addConversion', {
        templateUrl: 'views/addconversion.html',
        controller: 'addConversionCtrl',
        controllerAs: 'addconversion'
      })
      .when('/addSupplier', {
        templateUrl: 'views/addSupplier.html',
        controller: 'AddSupplierCtrl',
        controllerAs: 'addSupplier'
      })
      .when('/addcustomer', {
        templateUrl: 'views/addcustomer.html',
        controller: 'AddcustomerCtrl',
        controllerAs: 'addcustomer'
      })
      .when('/addsaleagent', {
        templateUrl: 'views/addsaleagent.html',
        controller: 'AddsaleagentCtrl',
        controllerAs: 'addsaleagent'
      })
      .when('/buy', {
        templateUrl: 'views/buy.html',
        controller: 'BuyCtrl',
        controllerAs: 'buy',
        authenticated: true
      })
      .when('/sell', {
        templateUrl: 'views/sell.html',
        controller: 'SellCtrl',
        controllerAs: 'sell'
      })
      .when('/add_buy_product', {
        templateUrl: 'views/add_buy_product.html',
        controller: 'AddBuyProductCtrl',
        controllerAs: 'addBuyProduct'
      })
      .when('/add_sell_product', {
        templateUrl: 'views/add_sell_product.html',
        controller: 'AddSellProductCtrl',
        controllerAs: 'addSellProduct'
      })
      .when('/inventory', {
        templateUrl: 'views/inventory.html',
        controller: 'InventoryCtrl',
        controllerAs: 'inventory'
      })
      .when('/transaction_sell', {
        templateUrl: 'views/transaction_sell.html',
        controller: 'TransactionSellCtrl',
        controllerAs: 'transactionSell'
      })
      .when('/transaction_buy', {
        templateUrl: 'views/transaction_buy.html',
        controller: 'TransactionBuyCtrl',
        controllerAs: 'transactionBuy'
      })
      .when('/inventory_hold', {
        templateUrl: 'views/inventory_hold.html',
        controller: 'InventoryHoldCtrl',
        controllerAs: 'inventoryHold'
      })
      .when('/add_hold_product', {
        templateUrl: 'views/add_hold_product.html',
        controller: 'AddHoldProductCtrl',
        controllerAs: 'addHoldProduct'
      })
      .when('/edit_hold_product', {
        templateUrl: 'views/edit_hold_product.html',
        controller: 'EditHoldProductCtrl',
        controllerAs: 'editHoldProduct'
      })
      .when('/cash_flow',{
        templateUrl : 'views/cash_flow.html',
        controller : 'CashFlowCtrl',
        controllerAs : 'cashFlow'
      })
      .when('/addCashFlows',{
        templateUrl : 'views/addCashFlows.html',
        controller : 'addCashFlowsCtrl',
        controllerAs : 'addCashFlows'
      })
      .when('/editCashFlows',{
        templateUrl : 'views/editCashFlows.html',
        controller : 'editCashFlowsCtrl',
        controllerAs : 'editCashFlows'
      })
      .when('/addSellTransaction',{
        templateUrl : 'views/addSellTransaction.html',
        controller : 'addSellTransactionCtrl',
        controllerAs : 'addSellTransaction'
      })
      .when('/addBuyTransaction',{
        templateUrl : 'views/addBuyTransaction.html',
        controller : 'addBuyTransactionCtrl',
        controllerAs : 'addBuyTransaction'
      })
      .when('/export',{
        templateUrl : 'views/export.html',
        controller : 'exportCtrl',
        controllerAs : 'export'
      })
      .when('/order',{
        templateUrl : 'views/order.html',
        controller : 'orderCtrl',
        controllerAs : 'order'
      })
      .when('/addorder',{
        templateUrl : 'views/addorder.html',
        controller : 'addOrderCtrl',
        controllerAs : 'addorder'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(["$rootScope","$location","sharedata",'$cookieStore',
    function($rootScope,$location,sharedata,$cookieStore){
      $rootScope.$on('$routeChangeStart',function(event,next,current){
        console.log('url has changed: '+$location.path());
        if($cookieStore.get('accessToken')===undefined){
          $location.path('/');
        }
      });
    }]);