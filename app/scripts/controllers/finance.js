'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:FinanceCtrl
 * @description
 * # FinanceCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('FinanceListCtrl', ['$scope', 'finance', function ($scope, finance) {

    $scope.date = new Date().getTime() - 24 * 3600 * 1000;
    $scope.datas = [];

    shopFinance();

    function shopFinance() {
      $scope.loading = true;
      finance.listShopFinanceByDate($scope.date).success(function (data) {
        $scope.loading = false;
        $scope.totals = data.totals;
        $scope.datas = data.shops.reverse();
        for (var i in $scope.datas) {
          var d = $scope.datas[i];
          d.total = Number(d.discount) + 5 * Number(d.pickup_num);
        }

      });
    }

    $scope.$watch('date', function (newVal, oldVal) {
      if (newVal != oldVal) {
        shopFinance();
      }
    });
  }]);
