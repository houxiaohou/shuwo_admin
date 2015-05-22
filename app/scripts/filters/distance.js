'use strict';

/**
 * @ngdoc filter
 * @name shuwoAdminApp.filter:distance
 * @function
 * @description
 * # distance
 * Filter in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .filter('orderDistance', function () {
    return function (input) {
      var distance = Number(input);
      if (distance > 1000000) {
        return '未知';
      }
      if (distance < 1000) {
        return distance + 'm';
      }
      return (distance / 1000).toFixed(2) + 'km';
    };
  });
