'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('CategoryCtrl', ['$scope', '$state', 'category',
    function ($scope, $state, category) {
      $scope.categoryList = [];
      $scope.categoryImgUrl = [];
      $scope.categoryDesc = '';
      $scope.categoryImgDesc = '';
      $scope.categoryImg = [];
      $scope.index = 0;
      // 获取分类列表
      category.listCategory().success(function (data) {
        $scope.categoryList = data;
      }).error(function () {
        alert('获取数据失败');
      });

      // 选中分类
      $scope.selectCategory = function (id) {
        $scope.selectedCategory = id;
      };

      // 确认删除分类
      $scope.removeCategory = function (e) {
        e.$hide();
        if (!$scope.selectedCategory) {
          return;
        }
        category.deleteCategory($scope.selectedCategory).success(function () {
          $state.reload();
        }).error(function () {
          alert('删除失败');
        });
      };
      // 新建分类的选项
      $scope.category = {categoryname: ''};
      $scope.saveCategory = function () {
        category.addCategory($scope.categoryImg).success(function () {
          $state.go('shuwo.category.list');
        }).error(function () {
          alert('添加出错');
        });
      };

      $scope.imageUploaded = function (link) {
        $scope.categoryImgUrl.push(link);
        $scope.categoryImg[$scope.index]=[];
        $scope.categoryImg[$scope.index].push($scope.category.categoryname);
        $scope.categoryImg[$scope.index].push(link);
        $scope.categoryImg[$scope.index].push($scope.categoryImgDesc);
        $scope.index ++ ;
        $scope.$apply();
      };

    }]);
angular.module('shuwoAdminApp')
  .controller('CategoryEditCtrl', ['$scope', '$state', '$stateParams', 'category',
    function ($scope, $state, $stateParams, category) {
      $scope.category = {};
      $scope.categoryImg = [];
      $scope.index = 0;
      $scope.show = false;
      var categoryid = $stateParams.categoryid;
      category.getCategoryById(categoryid).success(function (data) {
        $scope.category = data['category'];
        $scope.categoryImg = data['categorypic'];
      }).error(function () {
        alert('获取数据出错');
      });
      $scope.saveCategory = function () {
        $scope.data_post = {};
        $scope.data_post.category = $scope.category;
        $scope.data_post.img = {};
        category.updateCategory($scope.data_post).success(function () {
          $state.go('shuwo.category.list');
        }).error(function () {
          alert('保存出错！');
        });

      };

      $scope.imgClick = function(img) {
        var result = confirm('确认要删除吗?');
        if (result){
          category.deleteCategoryImg(img.id);
          $state.reload();
        }
      }

      $scope.imageUploaded = function (link) {
        $scope.img = {};
        $scope.img.imgurl = link;
        $scope.img.desc = $scope.categoryImgDesc;
        if ($scope.categoryImg == null){
          $scope.categoryImg = [];
          $scope.categoryImg[0] = $scope.img;
        }else
        {
          $scope.categoryImg[$scope.categoryImg.length] = $scope.img;
        }


        $scope.data_post = {};
        $scope.data_post.category = $scope.category;
        $scope.data_post.img = $scope.img;
        category.updateCategory($scope.data_post).success(function () {
          //$state.go('shuwo.category.list');
        }).error(function () {
          alert('保存出错！');
        });
        $state.reload();
      };



    }]);
