'use strict';

/**
 * @ngdoc service
 * @name shuwoAdminApp.shop
 * @description
 * # shop
 * Service in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .service('shop', ['$http', 'constants', function shop($http, constants) {
    return {
      getShopById: function (id) {
        return $http.get(constants.api.shop + '/' + id);
      },
      listShops: function () {
        return $http.get(constants.api.shopAll);
      },
      updateShop: function (data) {
        if (data.isopen) {
          data.isopen = 1;
        } else {
          data.isopen = 0;
        }
        if(data.isdiscount)
        {
          data.isdiscount = 1;
        }
        else
        {
          data.isdiscount = 0;
          data.discount = 0;
        }
        if (data.isbag) {
          data.isbag = 1;
        } else {
          data.isbag = 0;
        }
        return $http.post(constants.api.shop + '/' + data.shopid, data);
      },
      newShop: function (data) {
        if(data.isopen)
        {
          data.isopen = 1;
        }
        else
        {
          data.isopen = 0
        }
        if(data.isdiscount)
        {
          data.isdiscount = 1;
        }
        else
        {
          data.isdiscount = 0;
        }
        return $http.post(constants.api.shop, data);
      },
      deleteShop: function (id) {
        return $http.delete(constants.api.shop + '/' + id);
      },
      updateShopStatus: function(data) {
        return $http.post(constants.api.shop + '/' + data.shopid + '/isopen', {isopen: data.isopen ? 1 : 0});
      }
    };
  }]);
