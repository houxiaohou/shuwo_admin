'use strict';

/**
 * @ngdoc filter
 * @name shuwoAdminApp.filter:time
 * @function
 * @description
 * # time
 * Filter in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .filter('humanTime', function ($filter) {
    return function (date) {
      var time = new Date(date);
      date = time.getTime() / 1000;
      var now = new Date();
      if (time.getFullYear() != now.getFullYear() || time.getMonth() != now.getMonth()) {
        return $filter('date')(time, 'yyyy-MM-dd HH:mm');
      }
      if (now.getDate() - time.getDate() == 1) {
        return '昨天 ' + $filter('date')(time, 'HH:mm');
      }
      var ts = Date.now();
      var offset = Math.ceil(ts / 1000) - date;
      if (offset < 60) {
        return '刚刚';
      }
      if (offset / 60 < 60) {
        return Math.ceil(offset / 60) + '分钟前';
      }
      if (offset / 60 > 60 && offset / 60 / 60 < 24) {
        return Math.ceil(offset / 60 / 60) + '小时前';
      }
      return $filter('date')(date * 1000, 'MM-dd HH:mm');
    };
  });
