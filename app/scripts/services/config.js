'use strict';

angular.module('services.config', [])
  .constant('configuration', {
    urlPrefix: '/Api',
    templateBase: '/static/admin/',
    imagePath: '/static/admin/images/'
  });
