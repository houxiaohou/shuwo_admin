'use strict';

/**
 * @ngdoc service
 * @name shuwoAdminApp.account
 * @description
 * # account
 * Service in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .service('account', ['$http', 'constants', function account($http, constants) {
    return {
      login: function(data) {
        return $http.post(constants.api.login, data);
      }
    }
  }]);
