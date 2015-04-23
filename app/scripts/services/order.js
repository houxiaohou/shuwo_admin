'use strict';

/**
 * @ngdoc service
 * @name shuwoAdminApp.order
 * @description
 * # order
 * Service in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .service('order', ['$http', 'constants', function order($http, constants) {
    return {
      listAllOrders: function (params) {
        return $http.get(constants.api.allOrders, {params: params});
      },
      getOrderById: function (id) {
        return $http.get(constants.api.order + '/' + id);
      },
      searchOrder: function (data) {
        return $http.post(constants.api.searchorder, {search: data});
      },
      updateOrderDelivery: function (data) {
        return $http.post(constants.api.delivery, data);
      }
    }
  }]);
