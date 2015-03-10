'use strict';

/**
 * @ngdoc service
 * @name shuwoAdminApp.product
 * @description
 * # product
 * Service in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .service('product', ['$http', 'constants',
    function product($http, constants) {
      return {
        listProductsByShopId: function (id) {
          return $http.get(constants.api.shop + '/' + id + '/allproducts');
        },
        saveProduct: function (data) {
          var attribute = data.attribute;
          data.attribute = attribute.value;
          var category = data.category;
          data.categoryid = category.value;
          if (data.issale) {
            data.issale = 1;
          } else {
            data.issale = 0;
          }
          return $http.post(constants.api.product, data);
        },
        updateProduct: function (data) {
          var attribute = data.attribute;
          data.attribute = attribute.value;
          var category = data.category;
          data.categoryid = category.value;
          if (data.issale) {
            data.issale = 1;
          } else {
            data.issale = 0;
          }
          return $http.post(constants.api.product + '/' + data.productid, data);
        },
        deleteProduct: function (data) {
          return $http.delete(constants.api.product + '/' + data.productid);
        },
        getProductById: function (id) {
          return $http.get(constants.api.product + '/' + id);
        },
        updateProductStatus: function(data) {
          return $http.post(constants.api.product + '/' + data.productid + '/issale', {issale: data.issale ? 1 : 0});
        }
      }
    }]);
