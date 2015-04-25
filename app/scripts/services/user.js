'use strict';

/**
 * @ngdoc service
 * @name shuwoAdminApp.user
 * @description
 * # user
 * Service in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .service('user', ['$http', 'constants', function user($http, constants) {
    return {
      listAllUsers: function (params) {
        return $http.get(constants.api.allUsers, {params: params});
      },
      userOrders: function (userid) {
        return $http.get(constants.api.userOrder, {params: {userid: userid}});
      },
      blockUser: function(userid, block) {
        return $http.post(constants.api.userBlock, {userid: userid, block: block});
      },
      listBlockedUsers: function(params) {
        return $http.get(constants.api.blockedUsers, {params: params});
      }
    }
  }]);
