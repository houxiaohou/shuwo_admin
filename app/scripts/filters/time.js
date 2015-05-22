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
      if (date == null) {
        return '';
      }
      var time = new Date(date);
      date = time.getTime() / 1000;
      return $filter('date')(date * 1000, 'MM-dd HH:mm');
    };
  });
angular.module('shuwoAdminApp')
  .filter('timeOffset1', function () {
    return function (order) {
      if (order.confirm_time == null) {
        return '';
      }
      var time1 = new Date(order.createdtime);
      var time2 = new Date(order.confirm_time);
      var secNum = (time2.getTime() - time1.getTime()) / 1000;
      var hours = Math.floor(secNum / 3600);
      var minutes = Math.floor((secNum - (hours * 3600)) / 60);
      var second = secNum - (hours * 3600) - (minutes * 60);

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (second < 10) {
        second = "0" + second;
      }
      return hours + ':' + minutes + ':' + second;
    }
  });
angular.module('shuwoAdminApp')
  .filter('timeOffset2', function () {
    return function (order) {
      if (order.user_confirm_time == null) {
        return '';
      }
      var time1 = new Date(order.confirm_time);
      var time2 = new Date(order.user_confirm_time);
      var secNum = (time2.getTime() - time1.getTime()) / 1000;
      var hours = Math.floor(secNum / 3600);
      var minutes = Math.floor((secNum - (hours * 3600)) / 60);
      var second = secNum - (hours * 3600) - (minutes * 60);

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (second < 10) {
        second = "0" + second;
      }
      return hours + ':' + minutes + ':' + second;
    }
  });
angular.module('shuwoAdminApp')
  .filter('financeDate', function ($filter) {
    return function (date) {
      return $filter('date')(parseInt(date), 'MM-dd');
    };
  });

