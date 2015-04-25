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


    loadPage();

    function loadPage() {
      $scope.loading = true;
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
        loadPage();
      }
    });

    $scope.$watch('page', function (newVal, oldVal) {
      if (newVal != oldVal) {
        loadPage();
      }
    });

  }]);
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
