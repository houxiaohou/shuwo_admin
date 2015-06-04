'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:FinanceCtrl
 * @description
 * # FinanceCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('TongjiMainCtrl', ['$scope', 'tongji', function ($scope, tongji) {

    $scope.date = new Date().getTime() - 24 * 3600 * 1000;
    $scope.datas = [];

    jiutinguserFinance();

    function jiutinguserFinance() {
      $scope.loading = true;
      tongji.listShujuTongjiByDate().success(function (data) {
        $scope.loading = false;
        $scope.datas = data;

      });
    }

    $scope.$watch('date', function (newVal, oldVal) {
      if (newVal != oldVal) {
        jiutinguserFinance();
      }
    });
  }]);
