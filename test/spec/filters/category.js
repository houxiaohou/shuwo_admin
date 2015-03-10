'use strict';

describe('Filter: category', function () {

  // load the filter's module
  beforeEach(module('shuwoAdminApp'));

  // initialize a new instance of the filter before each test
  var category;
  beforeEach(inject(function ($filter) {
    category = $filter('category');
  }));

  it('should return the input prefixed with "category filter:"', function () {
    var text = 'angularjs';
    expect(category(text)).toBe('category filter: ' + text);
  });

});
