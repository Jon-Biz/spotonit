

var urltreiver = require('../../modules/urltreiver');
var Q = require('Q');

describe("urltreiver integration", function() {

	beforeEach(function() {
		jasmine.getEnv().defaultTimeoutInterval = 30000;	  
	});

	afterEach(function() {
	  jasmine.getEnv().defaultTimeoutInterval = 5000;
	});

  it("should be able to call spooky and get a string back", function(done) {    

  	urltreiver('http://elbizri.com/').then(function(result) {
  		expect(typeof result).toEqual('string');
  		done();
  	})

  });

  it("should be callable more than once", function(done) {


			urltreiver('http://calendar.boston.com').then(function(result) {
				expect(typeof result).toEqual('string');

		  	urltreiver('http://sfmom.org').then(function(result) {
		  		expect(typeof result).toEqual('string');
		  		done();
		  	})
			})

  });

});