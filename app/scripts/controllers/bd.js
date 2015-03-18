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
        $scope.selectedBD= id;
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
//      // 新建分类的选项
//      $scope.category = {categoryname: ''};
//      $scope.saveCategory = function () {
//        category.addCategory($scope.category).success(function () {
//          $state.go('shuwo.category.list');
//        }).error(function () {
//          alert('添加出错');
//        });
//      };
//
 }]);
//angular.module('shuwoAdminApp')
//  .controller('CategoryEditCtrl', ['$scope', '$state', '$stateParams', 'category',
//    function ($scope, $state, $stateParams, category) {
//      $scope.category = {};
//      var categoryid = $stateParams.categoryid;
//      category.getCategoryById(categoryid).success(function (data) {
//        $scope.category = data;
//      }).error(function () {
//        alert('获取数据出错');
//      });
//      $scope.saveCategory = function () {
//        category.updateCategory($scope.category).success(function () {
//          $state.go('shuwo.category.list');
//        }).error(function () {
//          alert('保存出错！');
//        });
//      };
//
//    }]);
