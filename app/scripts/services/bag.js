'use strict';

/**
 * @ngdoc service
 * @name shuwoAdminApp.bag
 * @description
 * # bag
 * Service in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .service('bag', ['$http', 'constants', function bag($http, constants) {
    return {
      listAllBags: function (params) {
        return $http.get(constants.api.allBags, {params: params});
      },
      searchBags: function (phone) {
        return $http.post(constants.api.searchBag, {phone: phone});
      },
      sendBags: function(userIds, amount) {
        return $http.post(constants.api.sendBags, {userids: userIds, amount: amount});
      }
    }
  }]);
