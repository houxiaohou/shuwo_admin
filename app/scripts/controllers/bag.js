'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:BagCtrl
 * @description
 * # BagCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('BagListCtrl', ['$scope', '$state', 'bag', function ($scope, $state, bag) {
    $scope.options = [
      {label: '不限', value: -1},
      {label: '0', value: 0},
      {label: '1', value: 1},
      {label: '2', value: 2},
      {label: '3', value: 3},
      {label: '4', value: 4},
      {label: '≥5', value: 5}
    ];

    $scope.bagUsed = $scope.options[0];
    $scope.bagAvailable = $scope.options[0];

    $scope.bags = [];

    $scope.loading = true;
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.total = 0;
    $scope.totalItems = 1;
    $scope.condition = 0;

    $scope.amount = 10;

    loadPage();

    function loadPage() {
      $scope.loading = true;
      bag.countUserNum({
        start: ($scope.page - 1) * $scope.perPage,
        count: $scope.perPage,
        used: $scope.bagUsed.value,
        available: $scope.bagAvailable.value
      }).success(function (data) {
        $scope.total = data.count;
        $scope.bags = data.users;
        if (data.users.length === 10) {
          $scope.totalItems += 10;
        }
        $scope.loading = false;
      });
    }

    $scope.$watch('filter', function (newVal, oldVal) {
      if (newVal != oldVal) {
        $scope.condition = $scope.filter.value;
        $scope.page = 1;
        $scope.totalItems = 1;
        loadPage();
      }
    });

    $scope.$watch('page', function (newVal, oldVal) {
      if (newVal != oldVal) {
        loadPage();
      }
    });

    $scope.bagSearch = function () {
      if ($scope.phone != undefined) {
        bag.searchBags($scope.phone).success(function (data) {
          $scope.isSearch = true;
          $scope.bags = data;
          $scope.page = 1;
          $scope.totalItems = 1;
        });
      }
    };

    $scope.selectUser = function (userId) {
      $scope.userId = userId;
    };

    $scope.sendBag = function (user_id, b) {
      if (confirm("确定送红包吗？")) {
        bag.sendBags(user_id, b).success(function () {
          alert('红包发送成功！');
        });
      }
    };

    $scope.sendGroupBag = function (amount) {
      if (confirm('确定群发红包吗')) {
        var used = $scope.bagUsed.value;
        var available = $scope.bagAvailable.value;
        if (used == -1 || available != 0) {
          alert('已使用不能选择不限，可用只能为0');
          return;
        }
        bag.sendGroupBags(used, available, amount);
        alert('已经发送请求，短时间内请不要重试！')
      }
    };

    $scope.$watch('bagUsed', function (newVal, oldVal) {
      if (newVal != oldVal) {
        $scope.page = 1;
        $scope.totalItems = 1;
        loadPage();
      }
    });
    $scope.$watch('bagAvailable', function (newVal, oldVal) {
      if (newVal != oldVal) {
        $scope.page = 1;
        $scope.totalItems = 1;
        loadPage();
      }
    });

  }]);
