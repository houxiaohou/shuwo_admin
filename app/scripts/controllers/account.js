'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('AccountCtrl', ['$scope', '$state', '$cookies', 'account', function ($scope, $state, $cookies, account) {
    $scope.login = function () {
      account.login($scope.user).success(function(data) {
        $cookies.token = data.utoken;
        $state.go('shuwo.default');
      });
    };
  }]);
