var _ = require('lodash');
var sinon = require('sinon');
require('jasmine-sinon');
var proxyquire = require('proxyquire');

var parser = require('../../modules/parser');

describe("Parser|", function() {
  xit("should exist", function() {
    expect(parser).toBeDefined();
  });
	xit("should return an array", function() {
	  expect(Array.isArray(parser("<html></html>"))).toBeTruthy();
	});
});