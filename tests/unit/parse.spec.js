var _ = require('lodash');
var sinon = require('sinon');
require('jasmine-sinon');

var proxyquire = require('proxyquire');

var jsxml = {};
jsxml.fromXml = sinon.stub().returns([]);

var parser = proxyquire('../../modules/parser',{'jsxml':jsxml});

var testJsonML = [ [ 'html', [ 'body', [ 'a', { href: 'test1' }, 'TestUrl' ], 'something else', [ 'a', { href: 'test2' }, 'TestUrl' ], [ 'a', { href: 'test3' }, 'TestUrl' ] ] ] ]
var testJsonMLDate = [ [ 'html', [ 'body', [ 'a', { href: 'test1' }, 'TestUrl' ], 'something else', [ 'a', { href: 'test2' }, 'TestUrl' ], [ 'a', { href: 'test3' }, 'January 4th 6:30pm' ] ] ] ]

describe("Parser", function() {
  it("should exist", function() {
    expect(parser).toBeDefined();
  });

  describe(".fromXml", function() {
    it("should call jsxml.fromXml", function() {
      parser.fromXml("<html></html>");
      expect(jsxml.fromXml).toHaveBeenCalled();
    });
    it("should return an array", function() {
      var result = parser.fromXml('<html></html>')
      expect(Array.isArray(result)).toBeTruthy();
    });
  });

  describe(".retreiveUrls", function() {


    it("should return an array", function() {
      var result = parser.retreiveUrls(testJsonML[0]);
		  expect(Array.isArray(result)).toBeTruthy();
    });
    it("should contain the contents of the href", function() {
      var result = parser.retreiveUrls(testJsonML[0]);
      expect(result).toContain('test1');
      expect(result).toContain('test2');
      expect(result).toContain('test3');

    });
  });

  describe(".getDomain", function() {
    it("should return the domain of a string passed to it", function() {

      expect(parser.getDomain('http://123.com/test')).toEqual('http://123.com');
      expect(parser.getDomain('http://456.com/test')).toEqual('http://456.com');
      expect(parser.getDomain('http://456.com')).toEqual('http://456.com');
      expect(parser.getDomain('http://456.com/')).toEqual('http://456.com');
      expect(parser.getDomain('http://789.com/test/')).toEqual('http://789.com');
      expect(parser.getDomain('http://987.com/test/more/')).toEqual('http://987.com');
      expect(parser.getDomain('http://101.com/test/more?=dsdsds')).toEqual('http://101.com');
      expect(parser.getDomain('http://www.123.com/test')).toEqual('http://www.123.com');
      expect(parser.getDomain('http://www.456.com/test')).toEqual('http://www.456.com');
      expect(parser.getDomain('http://www.456.com/test/more/')).toEqual('http://www.456.com');
    });
  });

  describe(".isEvent", function() {

    it("should return a boolean", function() {
      var result = parser.isEvent([]);
      expect(typeof result).toEqual('boolean');
    });

    it("should return false for (testJsonML) ", function() {
      var result = parser.isEvent(testJsonML);
      expect(result).toBeFalsy();      
    });

    it("should return true for (testJsonMLDate) ", function() {
      var result = parser.isEvent(testJsonMLDate);
      expect(result).toBeTruthy();      
    });

    it("should return true when passed an arraytree containing 'January'", function() {
      var data = ['html',['body',['January']]];
      var result = parser.isEvent(data);
      expect(result).toBeTruthy();         
    });

  });

});