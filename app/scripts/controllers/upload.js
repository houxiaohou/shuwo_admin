'use strict';

/**
 * @ngdoc function
 * @name shuwoAdminApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the shuwoAdminApp
 */
angular.module('shuwoAdminApp')
  .controller('UploadCtrl', ['$scope', 'upload', 'constants', function ($scope, upload, constants) {
    Qiniu.uploader({
      runtimes: 'html5,flash,html4',
      browse_button: 'upload-btn',
      uptoken_url: constants.api.uptoken,
      unique_names: true,
      domain: 'http://7u2out.com1.z0.glb.clouddn.com/',
      container: 'container',
      max_file_size: '100mb',
      flash_swf_url: 'js/plupload/Moxie.swf',
      max_retries: 3,
      dragdrop: true,
      drop_element: 'container',
      chunk_size: '4mb',
      auto_start: true,
      init: {
        'FilesAdded': function (up, files) {
          plupload.each(files, function (file) {
          });
        },
        'BeforeUpload': function (up, file) {
        },
        'UploadProgress': function (up, file) {

        },
        'FileUploaded': function (up, file, info) {
          var domain = up.getOption('domain');
          var res = JSON.parse(info);
          var sourceLink = domain + res.key;
          $scope.$parent.imageUploaded(sourceLink);
          console.log(sourceLink);
        },
        'Error': function (up, err, errTip) {
        },
        'UploadComplete': function () {
        },
        'Key': function (up, file) {
          var key = "";
          return key
        }
      }
    });
  }]);
