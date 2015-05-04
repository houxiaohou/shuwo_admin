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
      {label: '全部', value: 0},
      {label: '未使用', value: 1},
      {label: '已使用', value: 2}
    ];

    $scope.filter = $scope.options[0];

    $scope.bags = [];

    $scope.loading = true;
    $scope.page = 1;
    $scope.perPage = 10;
    $scope.totalItems = 1;
    $scope.condition = 0;

    $scope.amount = 10;

    loadPage();

    function loadPage() {
      $scope.loading = true;
      bag.listAllBags({
        start: ($scope.page - 1) * $scope.perPage,
        count: $scope.perPage,
        condition: $scope.condition
      }).success(function (data) {
        $scope.bags = data;
        if (data.length === 10) {
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

    $scope.confirmBag = function (e) {
      e.$hide();
      bag.sendBags($scope.userId, $scope.amount).success(function () {
        $state.reload();
      });
    };

  }]);
