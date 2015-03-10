'use strict';

/**
 * @ngdoc service
 * @name shuwoAdminApp.upload
 * @description
 * # upload
 * Service in the shuwoAdminApp.
 */
angular.module('shuwoAdminApp')
  .service('upload', function upload() {
    var image = '';
    return {
      setImage: function (img) {
        image = img;
      },
      getImage: function () {
        return image;
      }
    };
  });
