var _ = require('lodash');
var sinon = require('sinon');
require('jasmine-sinon');

var parser = require('../../modules/parser');

describe("Parser|", function() {
  it("should exist", function() {
    expect(parser).toBeDefined();
  });
  describe(".fromXml", function() {
		it("should return an array", function() {
		  expect(Array.isArray(parser.fromXml("<html></html>"))).toBeTruthy();
		});
		it("should return an array", function() {
			var result = parser.fromXml('<html><body><a href="test">TestUrl</a></body></html>')
		  expect(Array.isArray(result)).toBeTruthy();
		});    
  });

});
