var q = require('q');
var proxyquire = require('proxyquire');
var sinon = require('sinon');
require('jasmine-sinon');

describe("query", function() {

	var deferred, urltreiver,parser,query;

	beforeEach(function() {
		deferred = [];

		function newPromise () {
			var defer = q.defer();
			deferred.push(defer);
			return defer;
		}

		urltreiver = sinon.stub().returns(newPromise().promise);
		parser = {};
		query = proxyquire('../../modules/query',{
			'./urltreiver':urltreiver,
			'./parser':parser
			});	  
	});

	afterEach(function() {
	  urltreiver.reset();
	});

	describe(".launchQ(url)", function() {

		it("'url'=>'true'", function() {
		  var result = query.launchQ('url');
		  expect(result).toBeTruthy();
		});	

		it("'url'=>'true','url'=>'false'", function() {
		  var result = query.launchQ('url');
		  expect(result).toBeTruthy();
		  var result2 = query.launchQ('url');
		  expect(result2).not.toBeTruthy();
		});	

		it("when called again after the urltreiver resolves", function() {
		  var result = query.launchQ('url');
		  expect(result).toBeTruthy();
		  var result = query.launchQ('url');
		  expect(result).not.toBeTruthy();

			deferred[0].promise.then(function () {
				var result = query.launchQ('url')
				expect(result).toEqual('text');
			})
			deferred[0].resolve('text');
		});

		describe("when the urltreiver resolves", function() {

			it("should have called parser.fromXml()", function() {
				parser.fromXml = sinon.stub().returns([]);

			  var result = query.launchQ('url');
			  expect(parser.fromXml).not.toHaveBeenCalled();				

				deferred[0].promise.then(function() {
				  expect(parser.fromXml).toHaveBeenCalled();				
				})
  			deferred[0].resolve('text');
			});

			describe("and parser returns {'isEvent':true}", function() {
			  it('should return an array containing the url',function () {
	  			parser.process = sinon.stub().returns({'isEvent':true});
	  		  var result = query.launchQ('url');

					deferred[0].promise.then(function() {
					  var result = query.launchQ('url');
					  expect(result).toEqual(['url']);
					})
	  			deferred[0].resolve('text');
			  });
			});

			xdescribe("and parser returns {urls:['test']}", function() {
			  it("should call urltreiver with 'test'", function() {
	  	    
			  });
			});
		});
	});

	describe(".loadUrl(url)", function() {
		it("should call the url retreiver", function() {
		  expect(urltreiver).not.toHaveBeenCalled()
		  query.loadUrl('url');
		  expect(urltreiver).toHaveBeenCalled()
		});
	});
});