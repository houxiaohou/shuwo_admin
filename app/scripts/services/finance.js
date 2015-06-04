'use strict';

/**
 * @ngdoc service
 * @name shuwoAdminApp.finance
 * @description
 * # finance
 * Service in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .service('finance', ['$http', 'constants', function ($http, constants) {
    return {
        listShopFinanceByDate: function (date) {
        return $http.get(constants.api.financeShop, {params: {date: date}});
      }
    }
  }]);
