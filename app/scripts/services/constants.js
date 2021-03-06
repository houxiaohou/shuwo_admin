'use strict';

/**
 * @ngdoc service
 * @name shuwoAdminApp.constants
 * @description
 * # constants
 * Service in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .service('constants', ['configuration', function constants(configuration) {
    var URL_PREFIX = configuration.urlPrefix;
    return {
      api: {
        uptoken: URL_PREFIX + '/uptoken',
        categoryAll: URL_PREFIX + '/allcategory',
        category: URL_PREFIX + '/category',
        categoryimg: URL_PREFIX + '/categoryimg',
        shopAll: URL_PREFIX + '/allshops',
        shop: URL_PREFIX + '/shop',
        product: URL_PREFIX + '/product',
        login: URL_PREFIX + '/login',
        allOrders: URL_PREFIX + '/allorder',
        order: URL_PREFIX + '/order',
        bdAll: URL_PREFIX + '/allbds',
        bd: URL_PREFIX + '/bd',
        bdid: URL_PREFIX + '/bdid',
        searchorder: URL_PREFIX + '/searchorderbyadmin',
        delivery: URL_PREFIX + '/deliveryorder',
        allUsers: URL_PREFIX + '/analytics/users',
        blockedUsers: URL_PREFIX + '/user/blocked',
        searchUser: URL_PREFIX + '/user/search',
        userOrder: URL_PREFIX + '/analytics/user/orders',
        userBlock: URL_PREFIX + '/user/block',
        allBags: URL_PREFIX + '/bags/all',
        searchBag: URL_PREFIX + '/bags/search',
        sendBags: URL_PREFIX + '/sendbags',
        sendGroupBags: URL_PREFIX + '/sendGroupBags',
        filterBagUserCount: URL_PREFIX + '/bag/bagUserCount',
        financeShop: URL_PREFIX + '/finance/shops',
        financejiuting: URL_PREFIX + '/finance/jiuting'
      }
    }
  }]);
