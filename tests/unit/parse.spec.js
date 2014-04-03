var _ = require('lodash');
var sinon = require('sinon');
require('jasmine-sinon');
var proxyquire = require('proxyquire');

var parser = require('../../modules/parser');

describe("Parser|", function() {
  it("should exist", function() {
    expect(parser).toBeDefined();
  });
	it("should return an array", function() {
	  expect(Array.isArray(parser("<html></html>"))).toBeTruthy();
	});
});