'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('OrderListCtrl', ['$scope', 'order', 'shop', function ($scope, order, shop) {

    $scope.options = [
      {label: '全部订单', value: -1},
      {label: '差异订单', value: -2},
      {label: '待确认订单', value: 0},
      {label: '已确认订单', value: 1},
      {label: '无效订单', value: 2},
      {label: '已收货订单', value: 3},
      {label: '门店自提', value: -3},
      {label: '送货上门', value: -4}
    ];

    $scope.filter = $scope.options[0];

    $scope.loading = true;
    $scope.status = -1;
    $scope.shopId = -1;
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.totalItems = 1;

    $scope.allShops = {};


    shop.listShops().success(function (data) {
      $scope.shops = [{label: '全部店铺', value: '-1'}];
      for (var i in data) {
        var s = data[i];
        $scope.shops.push({label: s.spn, value: s.shopid});
        $scope.allShops[s.shopid] = s.spn;
      }
      $scope.shopFilter = $scope.shops[0];
    });

    function loadPage() {
      $scope.loading = true;
      order.listAllOrders({
        start: ($scope.page - 1) * $scope.perPage,
        count: $scope.perPage,
        status: $scope.status,
        shopId: $scope.shopId
      }).success(function (data) {
        $scope.orders = data;
        if (data.length === 10) {
          $scope.totalItems += 10;
        }
        $scope.loading = false;
      });
    }

    $scope.orderSearch = function () {
      if ($scope.order.search != undefined) {
        order.searchOrder($scope.order.search).success(function (data) {
          $scope.isSearch = true;
          $scope.orders = data;
          $scope.page = 1;
          $scope.totalItems = 1;
        });
      }
    };
    $scope.$watch('order.search', function () {
      if ($scope.order.search == undefined || $scope.order.search == '') {
        loadPage(-1);
        $scope.isSearch = false;
      }
    });

    $scope.$watchCollection('[filter, shopFilter]', function (newValues, oldValues) {
      // 搜索订单
      if (newValues[0] === undefined || newValues[1] === undefined) {
        return;
      }
      $scope.status = newValues[0].value;
      $scope.shopId = newValues[1].value;
      $scope.page = 1;
      loadPage();
    });

    $scope.$watch('page', function (newVal, oldVal) {
      if (newVal != oldVal) {
        if (!$scope.isSearch)
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
      $scope.confirm = {};

      order.getOrderById(id).success(function (data) {
        $scope.order = data;
        $scope.shopLoading = false;
        if ($scope.order.isdelivery == '1') {
          $scope.confirm.ispickup = 0;
          $scope.confirm.address = $scope.order.address;
          console.log($scope.confirm);
        }
        shop.getShopById(data.shopid).success(function (data) {
          $scope.shop = data;
          $scope.shopLoading = false;
        });
      });

      $scope.saveOrderDelivery = function () {
        order.updateOrderDelivery({
          orderid: $scope.order.orderid,
          ispickup: $scope.confirm.ispickup ? 1 : 0,
          address: $scope.confirm.address
        }).success(function () {
          $scope.order.isdelivery = '0';
          $scope.order.ispickup = $scope.confirm.ispickup ? 1 : 0 + '';
        });
      };

    }]);
