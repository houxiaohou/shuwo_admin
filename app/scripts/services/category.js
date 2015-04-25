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
        return $http.post(constants.api.category, {categoryname: data[0][0],categoryImg:data});
      },
      updateCategory: function (data) {
        return $http.post(constants.api.category + '/' + Number(data.category.categoryid), {categoryname: data.category.categoryname,img:data.img});
      },
      listCategory: function () {
        return $http.get(constants.api.categoryAll);
      },
      deleteCategory: function (id) {
        return $http.delete(constants.api.category + '/' + id);
      },
      deleteCategoryImg: function(id){
        return $http.delete(constants.api.categoryimg + '/' + id);
      },
      getCategoryById: function (id) {
        return $http.get(constants.api.category + '/' + id);
      }
    };
  }]);
