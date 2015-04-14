'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('ShopProductCtrl', ['$scope', '$state', '$stateParams', 'shop', 'product','category',
    function ($scope, $state, $stateParams, shop, product,category) {
      var shopId = $stateParams.id;
      $scope.product = {issale: true, shopid: shopId};
      $scope.shop = undefined;
      $scope.loading = true;
      $scope.products = [];

      $scope.options = [
        {label: '按数量销售，按重量计价', value: 1},
        {label: '按重量销售，按重量计价', value: 2},
        {label: '按数量销售，按数量计价', value: 3}
      ];
      $scope.product.attribute = $scope.options[0]

      shop.getShopById(shopId).success(function (data) {
        if (typeof data === 'object') {
          $scope.shop = data;
        }
      });

      $scope.categories = [];
      category.listCategory().success(function (data) {
        for (var i in data) {
          $scope.categories.push({label: data[i].categoryname, value: data[i].categoryid});
          $scope.product.category = $scope.categories[0];
        }
      });

      $scope.saveProduct = function () {
        product.saveProduct($scope.product);
        $state.reload();
      };

      // 图片上传完成后的回调方法
      $scope.imageUploaded = function (link) {
        $scope.product.pimgurl = link;
        $scope.$apply();
      };

      // 列出店铺产品
      product.listProductsByShopId(shopId).success(function (data) {
        if (typeof data === 'object') {
          for (var i in data) {
            var p = data[i];
            p.issale = p.issale === '1';
            p.attribute =  $scope.options[p.attribute-1]['label'];
            p.isEdit = 0;
            $scope.products.push(p);
          }
        }
        $scope.loading = false;
      });

      // 选中遥操作的产品
      $scope.selectProduct = function (product) {
        $scope.productSelected = product;
      };

      $scope.productEdit= function(p)
      {
        p.isEdit = 1;
      };

      // 删除产品
      $scope.removeProduct = function (e) {
        e.$hide();
        product.deleteProduct($scope.productSelected);
        $state.reload();
      };

      // 上下架产品
      $scope.changeSaleStatus = function (p) {
        product.updateProductStatus(p);
      };

    }]);
angular.module('shuwoAdminApp')
  .controller('ProductAddCtrl', ['$scope', '$state', '$stateParams', 'shop', 'product', 'category',
    function ($scope, $state, $stateParams, shop, product, category) {
      var shopId = $stateParams.id;
      $scope.product = {issale: true, shopid: shopId};
      $scope.options = [
        {label: '按数量销售，按重量计价', value: 1},
        {label: '按重量销售，按重量计价', value: 2},
        {label: '按数量销售，按数量计价', value: 3}
      ];
      $scope.product.attribute = $scope.options[0];
      $scope.categories = [];
      category.listCategory().success(function (data) {
        for (var i in data) {
          $scope.categories.push({label: data[i].categoryname, value: data[i].categoryid});
          $scope.product.category = $scope.categories[0];
        }

      });

      // 图片上传完成后的回调方法
      $scope.imageUploaded = function (link) {
        $scope.product.pimgurl = link;
        $scope.$apply();
      };

      // 新增产品
      $scope.saveProduct = function () {
        product.saveProduct($scope.product);
        $state.go('shuwo.shop.product.list');
      };

    }]);
angular.module('shuwoAdminApp')
  .controller('ProductEditCtrl', ['$scope', '$state', '$stateParams', 'shop', 'product', 'category',
    function ($scope, $state, $stateParams, shop, product, category) {
      $scope.product = {};
      $scope.categories = [];

      $scope.options = [
        {label: '按数量销售，按重量计价', value: 1},
        {label: '按重量销售，按重量计价', value: 2},
        {label: '按数量销售，按数量计价', value: 3}
      ];

      product.getProductById($stateParams.productId).success(function (data) {
        $scope.product = data;
        $scope.product.attribute = $scope.options[$scope.product.attribute - 1];
        $scope.product.issale = $scope.product.issale === '1';
        productLoaded();
      });

      function productLoaded() {
        category.listCategory().success(function (data) {
          for (var i in data) {
            var c = {label: data[i].categoryname, value: data[i].categoryid};
            $scope.categories.push(c);
            if (data[i].categoryid == $scope.product.categoryid) {
              $scope.product.category = c;
            }
          }
        });
      }

      // 图片上传完成后的回调方法
      $scope.imageUploaded = function (link) {
        $scope.product.pimgurl = link;
        $scope.$apply();
      };

      // 更新产品
      $scope.updateProduct = function () {
        product.updateProduct($scope.product);
        $state.go('shuwo.shop.product.list');
      }
    }]);
