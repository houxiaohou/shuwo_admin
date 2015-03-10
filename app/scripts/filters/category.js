'use strict';

/**
 * @ngdoc filter
 * @name shuwoAdminApp.filter:category
 * @function
 * @description
 * # category
 * Filter in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .filter('category', function () {
    return function (input) {
      var options = {
        '1': '个',
        '2': '斤/克',
        '3': '根',
        '4': '盒'
      };
      return options[input]
    };
  });
