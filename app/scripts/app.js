'use strict';

/**
 * @ngdoc overview
 * @name shuwoAdminApp
 * @description
 * # shuwoAdminApp
 *
 * Main module of the application.
 */
angular
  .module('shuwoAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'mgcrea.ngStrap',
    'services.config'
  ])
  .config(['$urlRouterProvider', '$stateProvider', '$httpProvider', 'configuration',
    function ($urlRouterProvider, $stateProvider, $httpProvider, configuration) {
      var interceptor = ['$rootScope', '$q', '$injector', function (scope, $q, $injector) {
        function success(response) {
          return response;
        }

        function error(response) {
          var status = response.status;
          if (status == 401) {
            $injector.get('$state').go('shuwo.account');
            return;
          }
          return $q.reject(response);
        }

        return function (promise) {
          return promise.then(success, error);
        }
      }];
      $httpProvider.responseInterceptors.push(interceptor);
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
          return data;
        }
        return $.param(data);
      };
      $urlRouterProvider.otherwise("/");
      var templateBase = configuration.templateBase;
      $stateProvider
        .state('shuwo', {
          url: '',
          templateUrl: templateBase + 'views/base.html'
        })
        .state('shuwo.account', {
          url: '/account',
          controller: 'AccountCtrl',
          templateUrl: templateBase + 'views/account.html'
        })
        .state('shuwo.default', {
          url: '/',
          templateUrl: templateBase + 'views/default.html',
          controller: 'DefaultCtrl'
        })
        .state('shuwo.category', {
          abstract: true,
          url: '/category',
          template: '<ui-view />'
        })
        .state('shuwo.category.list', {
          url: '',
          templateUrl: templateBase + 'views/category.list.html',
          controller: 'CategoryCtrl'
        })
        .state('shuwo.category.add', {
          url: '/add',
          templateUrl: templateBase + 'views/category.add.html',
          controller: 'CategoryCtrl'
        })
        .state('shuwo.category.edit', {
          url: '/{categoryid:[0-9]{1,10}}',
          templateUrl: templateBase + 'views/category.edit.html',
          controller: 'CategoryEditCtrl'
        })
        .state('shuwo.shop', {
          abstract: true,
          url: '/shop',
          template: '<ui-view />'
        })
        .state('shuwo.shop.list', {
          url: '',
          templateUrl: templateBase + 'views/shop.list.html',
          controller: 'ShopCtrl'
        })
        .state('shuwo.shop.add', {
          url: '/add',
          templateUrl: templateBase + 'views/shop.add.html',
          controller: 'ShopAddCtrl'
        })
        .state('shuwo.shop.detail', {
          url: '/{id:[0-9]{1,10}}',
          templateUrl: templateBase + 'views/shop.detail.html',
          controller: 'ShopDetailCtrl'
        })
        .state('shuwo.shop.edit', {
          url: '/{id:[0-9]{1,10}}/edit',
          templateUrl: templateBase + 'views/shop.edit.html',
          controller: 'ShopEditCtrl'
        })
        .state('shuwo.shop.product', {
          abstract: true,
          url: '/{id:[0-9]{1,10}}',
          template: '<ui-view />'
        })
        .state('shuwo.shop.product.list', {
          url: '/product',
          templateUrl: templateBase + 'views/shop.product.list.html',
          controller: 'ShopProductCtrl'
        })
        .state('shuwo.shop.product.add', {
          url: '/product/add',
          templateUrl: templateBase + 'views/product.add.html',
          controller: 'ProductAddCtrl'
        })
        .state('shuwo.shop.product.edit', {
          url: '/product/{productId:[0-9]{1,10}}',
          templateUrl: templateBase + 'views/product.edit.html',
          controller: 'ProductEditCtrl'
        })
        .state('shuwo.order', {
          url: '/order',
          abstract: true,
          template: '<ui-view />'
        })
        .state('shuwo.order.list', {
          url: '',
          templateUrl: templateBase + 'views/order.list.html',
          controller: 'OrderListCtrl'
        })
        .state('shuwo.order.detail', {
          url: '/{id:[0-9]{1,20}}',
          templateUrl: templateBase + 'views/order.detail.html',
          controller: 'OrderDetailCtrl'
        })
        .state('shuwo.bd', {
          abstract: true,
          url: '/bd',
          template: '<ui-view />'
        })
        .state('shuwo.bd.list', {
          url: '',
          templateUrl: templateBase + 'views/bd.list.html',
          controller: 'BDCtrl'
        })
        .state('shuwo.bd.shop', {
          abstract: true,
          url: '/{id:[0-9]{1,10}}',
          template: '<ui-view />'
        })
        .state('shuwo.bd.shop.list', {
          url: '',
          templateUrl: templateBase + 'views/bd.shop.list.html',
          controller: 'BDShopCtrl'
        })
        .state('shuwo.user', {
          abstract: true,
          url: '/users',
          template: '<ui-view />'
        })
        .state('shuwo.user.list', {
          url: '',
          templateUrl: templateBase + 'views/user.list.html',
          controller: 'UsersCtrl'
        })
        .state('shuwo.user.orders', {
          url: '/orders/{id:[0-9]{1,20}}',
          templateUrl: templateBase + 'views/user.orders.html',
          controller: 'UserOrdersCtrl'
        })
        .state('shuwo.bag', {
          abstract: true,
          url: '/bag',
          template: '<ui-view />'
        })
        .state('shuwo.bag.list', {
          url: '',
          templateUrl: templateBase + 'views/bag.list.html',
          controller: 'BagListCtrl'
        })
        .state('shuwo.finance', {
          abstract: true,
          url: '/finance',
          template: '<ui-view />'
        })
        .state('shuwo.finance.list', {
          url: '',
          templateUrl: templateBase + 'views/finance.list.html',
          controller: 'FinanceListCtrl'
        })
    }])
  .run(['$rootScope', '$state', '$stateParams', '$http', '$cookies',
    function ($rootScope, $state, $stateParams, $http, $cookies) {
      $http.defaults.headers.common['Authorization'] = $cookies.token;
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }]);
