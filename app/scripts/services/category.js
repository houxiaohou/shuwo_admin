'use strict';

/**
 * @ngdoc service
 * @name shuwoAdminApp.category
 * @description
 * # category
 * Service in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .service('category', ['$http', 'constants', function category($http, constants) {
    return {
      addCategory: function (data) {
        return $http.post(constants.api.category, {categoryname: data.categoryname});
      },
      updateCategory: function (data) {
        return $http.post(constants.api.category + '/' + data.categoryid, {categoryname: data.categoryname});
      },
      listCategory: function () {
        return $http.get(constants.api.categoryAll);
      },
      deleteCategory: function (id) {
        return $http.delete(constants.api.category + '/' + id);
      },
      getCategoryById: function (id) {
        return $http.get(constants.api.category + '/' + id);
      }
    };
  }]);
