'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:FinanceCtrl
 * @description
 * # FinanceCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('TongjiMainCtrl', ['$scope','$state', 'tongji', function ($scope, $state,tongji) {

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
