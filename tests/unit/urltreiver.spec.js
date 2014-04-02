var _ = require('lodash');
var sinon = require('sinon');
require('jasmine-sinon');
var proxyquire = require('proxyquire');


var urltreiver = require('../../modules/urltreiver');

describe("the urltriever module", function() {
  it("should return a promise`", function() {
  	expect(urltreiver().then).toBeDefined();
  });
});