var Spooky = require('Spooky');
var Q = require('Q');

module.exports = function(url) {
	
	var deferred = Q.defer();

	function getUrl() {

		var spooky = new Spooky({
			  child: {
			      transport: 'http'
			  },
			  casper: {
			      logLevel: 'debug',
			      verbose: true
			  }
			}, function (err) {

	      if (err) {
	        e = new Error('Failed to initialize SpookyJS');
	        e.details = err;
	        throw e;
	    	}

		    spooky.start(url);

		    spooky.then([{}, function () {

	        var js = this.evaluate(function() {
	            return document; 
	        }); 
	        this.emit('content',JSON.stringify(js)); 
	    	}]);

		    spooky.run();
			}
	  );

		spooky.on('content',function (content) {
			deferred.resolve(content)
			//return content;
		});

		spooky.on('error', function (e, stack) {
		    console.error(e);

		    if (stack) {
		        console.log(stack);
		    }

		    deferred.reject(new Error(e));

			});
	}	

	getUrl(url);
	
	return deferred.promise;
}; 