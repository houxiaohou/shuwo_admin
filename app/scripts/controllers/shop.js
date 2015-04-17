'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('ShopCtrl', ['$scope', '$state', 'shop',
    function ($scope, $state, shop) {
      // 店铺列表
      $scope.shopes = [];
      $scope.loading = true;
      shop.listShops().success(function (data) {
        if (typeof data === 'object') {
          for (var i in data) {
            var shop = data[i];
            shop.isopen = shop.isopen === '1';
            if(shop.isdiscount==1)
            {
              shop.isdiscount = '是';
            }
            else
            {
              shop.isdiscount = '否';
            }
            $scope.shopes.push(shop);

          }
        }
        $scope.loading = false;
      });

      // 选择要操作的店铺
      $scope.selectShop = function (id) {
        $scope.selectedShop = id;
      };

      // 删除店铺
      $scope.removeShop = function (e) {
        e.$hide();
        shop.deleteShop($scope.selectedShop);
        $state.reload();
      };

      // 更新店铺状态
      $scope.changeShopStatus = function (s) {
        shop.updateShopStatus(s);
      };
    }]);
angular.module('shuwoAdminApp')
  .controller('ShopAddCtrl', ['$scope', '$state', 'shop',
    function ($scope, $state, shop) {
      $scope.shop = {simgurl: ''};

      $scope.saveShop = function () {
        if ($scope.shop.lat === undefined || $scope.shop.lng === undefined) {
          alert('请在地图上标出地点');
          return;
        }
        shop.newShop($scope.shop).success(function () {
          $state.go('shuwo.shop.list');
        }).error(function () {
          alert('创建失败！');
        });
      };
      initialMap();
      function initialMap() {
        var map = new BMap.Map('map');
        map.addControl(new BMap.NavigationControl());
        map.centerAndZoom('上海');
        map.addEventListener('click', function (e) {
          map.clearOverlays();
          var marker = new BMap.Marker(e.point);
          map.addOverlay(marker);
          $scope.shop.lat = e.point.lat;
          $scope.shop.lng = e.point.lng;
        });
      }

      $scope.imageUploaded = function (link) {
        $scope.shop.simgurl = link;
        $scope.$apply();
      };

    }]);
angular.module('shuwoAdminApp')
  .controller('ShopEditCtrl', ['$scope', '$state', '$stateParams', 'shop',
    function ($scope, $state, $stateParams, shop) {
      var shopId = $stateParams.id;
      $scope.shop = undefined;

      shop.getShopById(shopId).success(function (data) {
        $scope.shop = data;
        $scope.shop.dlprice = Number($scope.shop.dlprice);
        $scope.shop.isopen = $scope.shop.isopen === '1';
        $scope.shop.isdiscount = $scope.shop.isdiscount ==='1';
        $scope.shop.discount = Number($scope.shop.discount);
        initialMap();
      });

      var map;

      function initialMap() {
        map = new BMap.Map('map');
        map.addControl(new BMap.NavigationControl());
        map.centerAndZoom(new BMap.Point($scope.shop.lng, $scope.shop.lat), 15);
        map.addEventListener('click', function (e) {
          map.clearOverlays();
          var marker = new BMap.Marker(e.point);
          map.addOverlay(marker);
          $scope.shop.lat = e.point.lat;
          $scope.shop.lng = e.point.lng;
        });
      }

      $scope.$watch('shop', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          var marker = new BMap.Marker(new BMap.Point($scope.shop.lng, $scope.shop.lat));
          map.addOverlay(marker);
        }
      });

      $scope.saveShop = function () {
        shop.updateShop($scope.shop).success(function () {
          $state.go('shuwo.shop.list');
        });
      };

      $scope.imageUploaded = function (link) {
        $scope.shop.simgurl = link;
        $scope.$apply();
      };

    }]);
angular.module('shuwoAdminApp')
  .controller('ShopDetailCtrl', ['$scope', '$state', '$stateParams', 'shop',
    function ($scope, $state, $stateParams, shop) {
      var shopId = $stateParams.id;
      $scope.shop = undefined;

      shop.getShopById(shopId).success(function (data) {
        $scope.shop = data;
        initialMap();

      });

      var map;

      function initialMap() {
        map = new BMap.Map('map');
        map.addControl(new BMap.NavigationControl());
        map.centerAndZoom(new BMap.Point($scope.shop.lng, $scope.shop.lat), 15);
      }

      $scope.$watch('shop', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          var marker = new BMap.Marker(new BMap.Point($scope.shop.lng, $scope.shop.lat));
          map.addOverlay(marker);
        }
      });

    }]);
