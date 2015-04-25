'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('BDCtrl', ['$scope', '$state', 'bd',
    function ($scope, $state, bd) {
      $scope.bdList = [];
      // 获取分类列表
      bd.listBD().success(function (data) {
        $scope.bdList = data;
      }).error(function () {
        alert('获取数据失败');
      });
//
//      // 选中分类
      $scope.selectBD = function (id) {
        $scope.selectedBD = id;
      };

      // 确认删除分类
      $scope.removeBD = function (e) {
        e.$hide();
        if (!$scope.selectedBD) {
          return;
        }
        bd.deleteBD($scope.selectedBD).success(function () {
          $state.reload();
        }).error(function () {
          alert('删除失败');
        });
      };

    }]);

angular.module('shuwoAdminApp')
  .controller('BDShopCtrl', ['$scope', '$state', '$stateParams', 'bd', 'shop',
    function ($scope, $state, $stateParams, bd, shop) {
      $scope.bdId = $stateParams.id;

      $scope.shopOptions = [];

      bd.listBDShops($scope.bdId).success(function (data) {
        $scope.shops = data.shops;
        $scope.bd = data.bd;
      });

      shop.listShops().success(function (data) {
        for (var i in data) {
          var s = data[i];
          $scope.shopOptions.push({label: s.spn, value: s.shopid});
        }
        $scope.selectedShop = $scope.shopOptions[0];
      });

      $scope.addShop = function () {
        // 添加店铺
        bd.addBDShop($scope.bdId, $scope.selectedShop.value).success(function () {
          $state.go($state.current, {}, {reload: true});
        });
      };
      $scope.deleteShop = function (shopid) {
        // 删除店铺
        bd.deleteBDShop($scope.bdId, shopid).success(function () {
          $state.go($state.current, {}, {reload: true});
        });
      };

    }]);
