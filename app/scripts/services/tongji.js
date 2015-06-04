'use strict';

/**
 * @ngdoc service
 * @name shuwoAdminApp.finance
 * @description
 * # finance
 * Service in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .service('tongji', ['$http', 'constants', function ($http, constants) {
    return {
      listShujuTongjiByDate: function () {
        return $http.get(constants.api.financejiuting);
      }
    }
  }]);
