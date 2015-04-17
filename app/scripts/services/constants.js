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
        shopAll: URL_PREFIX + '/allshops',
        shop: URL_PREFIX + '/shop',
        product: URL_PREFIX + '/product',
        login: URL_PREFIX + '/login',
        allOrders: URL_PREFIX + '/allorder',
        order: URL_PREFIX + '/order',
        bdAll: URL_PREFIX+'/allbds',
        bd: URL_PREFIX+'/bd',
        bdid: URL_PREFIX+'/bdid',
        searchorder:URL_PREFIX+'/searchorder'
      }
    }
  }]);
