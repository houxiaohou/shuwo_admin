'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('UsersCtrl', ['$scope', 'user', function ($scope, user) {

    $scope.options = [
      {label: '全部日期', value: -1},
      {label: '最近7天', value: 6}
    ];

    $scope.filter = $scope.options[0];

    $scope.loading = true;
    $scope.days = -1;
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.totalItems = 1;
    $scope.blocked = false;


    loadPage();

    function loadPage() {
      $scope.loading = true;

      if ($scope.blocked) {
        // 黑名单用户
        user.listBlockedUsers({
          start: ($scope.page - 1) * $scope.perPage,
          count: $scope.perPage
        }).success(function (data) {
          $scope.users = data;
          if (data.length === 10) {
            $scope.totalItems += 10;
          }
          $scope.loading = false;
        });
        return;
      }

      user.listAllUsers({
        start: ($scope.page - 1) * $scope.perPage,
        count: $scope.perPage,
        days: $scope.days
      }).success(function (data) {
        $scope.users = data;
        if (data.length === 10) {
          $scope.totalItems += 10;
        }
        $scope.loading = false;
      });
    }

    $scope.$watch('filter', function (newVal, oldVal) {
      if (newVal != oldVal) {
        $scope.days = $scope.filter.value;
        $scope.page = 1;
        $scope.blocked = false;
        $scope.totalItems = 1;
        loadPage();
      }
    });

    $scope.$watch('page', function (newVal, oldVal) {
      if (newVal != oldVal) {
        loadPage();
      }
    });

    $scope.$watch('blocked', function (newVal, oldVal) {
      if (newVal != oldVal) {
        $scope.filter = $scope.options[0];
        $scope.days = $scope.filter.value;
        $scope.page = 1;
        $scope.totalItems = 1;
        loadPage();
      }
    });

    $scope.blockUser = function (u) {
      // 禁止用户下单
      if (!confirm('确认加入黑名单吗？')) {
        return;
      }
      user.blockUser(u.userid, 1).success(function () {
        u.block = 1;
      });
    };

    $scope.unBlockUser = function (u) {
      // 取消禁止下单
      if (!confirm('确认取消黑名单吗？')) {
        return;
      }
      user.blockUser(u.userid, 0).success(function () {
        u.block = 0;
      });
    }

  }])
;
angular.module('shuwoAdminApp')
  .controller('UserOrdersCtrl', ['$scope', '$stateParams', 'user', 'shop',
    function ($scope, $stateParams, user, shop) {
      var userId = $stateParams.id;

      $scope.allShops = {};


      shop.listShops().success(function (data) {
        for (var i in data) {
          var s = data[i];
          $scope.allShops[s.shopid] = s.spn;
        }
      });

      user.userOrders(userId).success(function (data) {
        $scope.orders = data.orders;
        $scope.user = data.user;
      });

    }]);
