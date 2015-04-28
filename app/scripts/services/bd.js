/**
 * Created by 47276 on 2015/3/18.
 */
angular.module('shuwoAdminApp')
  .service('bd', ['$http', 'constants', function bd($http, constants) {
    return {
      listBD: function () {
        return $http.get(constants.api.bdAll);
      },
      deleteBD: function (id) {
        return $http.delete(constants.api.bd + '/' + id);
      },
      listBDShops: function(id) {
        return $http.get(constants.api.bd + '/' + id + '/shops');
      },
      addBDShop: function(bdid, shopid) {
        return $http.post(constants.api.bd + '/' + bdid + '/shop/' + shopid);
      },
      deleteBDShop: function(bdid, shopid) {
        return $http.delete(constants.api.bd + '/' + bdid + '/shop/' + shopid);
      }

    };
  }]);
