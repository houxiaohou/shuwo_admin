/**
 * Created by melodydx on 2015/4/16.
 */
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
  .filter('shop', function () {
    return function (input) {
      var options = {
        '1': '是',
        '0': '否'
      };
      return options[input]
    };
  });
