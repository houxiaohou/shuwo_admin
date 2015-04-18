'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('OrderListCtrl', ['$scope', 'order', function ($scope, order) {

    $scope.loading = true;
    $scope.status = -1;
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.totalItems = 1;

    function loadPage() {
      $scope.loading = true;
      order.listAllOrders(($scope.page - 1) * $scope.perPage, $scope.perPage, $scope.status).success(function (data) {
        $scope.orders = data;
        if (data.length === 10) {
          $scope.totalItems += 10;
        }
        $scope.loading = false;
      });
    }

    loadPage();

    $scope.orderSearch =function()
    {
      if($scope.order.search !=undefined) {
        order.searchOrder($scope.order.search).success(function(data){
          $scope.isSearch = true;
          $scope.orders = data;
          $scope.page = 1
          $scope.totalItems = 1;
        });
      }
    }
    $scope.$watch('order.search',function(){
      if($scope.order.search == undefined || $scope.order.search == '')
      {
        loadPage();
        $scope.isSearch = false;
      }
    });




    $scope.$watch('page', function (newVal, oldVal) {
      if (newVal != oldVal) {
        if(!$scope.isSearch)
         loadPage();
      }
    });

  }]);
angular.module('shuwoAdminApp')
  .controller('OrderDetailCtrl', ['$scope', '$stateParams', 'order', 'shop',
    function ($scope, $stateParams, order, shop) {
      var id = $stateParams.id;

      $scope.orderLoading = true;
      $scope.shopLoading = true;

      order.getOrderById(id).success(function (data) {
        $scope.order = data;
        $scope.shopLoading = false;

        shop.getShopById(data.shopid).success(function (data) {
          $scope.shop = data;
          $scope.shopLoading = false;
        });

      });

    }]);
