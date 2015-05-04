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
        $scope.datas = data;
      });
    }

    $scope.$watch('date', function (newVal, oldVal) {
      if (newVal != oldVal) {
        shopFinance();
      }
    });
  }]);
