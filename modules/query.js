var _ = require('lodash');
var q = require('q');
var jsxml = require('jsxml');

var urltreiver = require('./urltreiver');
var parser = require('./parser');

var queries = [];

module.exports.launchQ = function(url) {

	var query = _.findWhere(queries,{'url':url});
	if(!query){
		this.loadUrl(url,queries.length);
		queries.push({'url':url,'result':false});
		return true;
		}else{
			if(!query.result){
				return false;
			}else{
				return query.result;
			}
		}
	}


module.exports.loadUrl = this.loadUrl = function(url,index) {

	var eventUrls = [];
	var queryUrls = [];
	var domain = parser.getDomain(url);

	function fetch (url) {
		queryUrls.push(url);
		var scrape = urltreiver(url).then(function (result) {
			// console.log('json')
			// var json = 	jsxml.fromXml(result);
			// console.log('json',json)
			return result;
		});
		return scrape;
	}
	var request = fetch(url);

	// 	var scrape = urltreiver(url).then(function (result) {
	// 		console.log('result',result)

	// 		console.log('here2')
	// 		var page = parser.process(json);

	// 		if(page.isEvent){
	// 			eventUrls.push(url);
	// 		}

	// 		if(page.urls){
	// 			var pageUrls = [];
	// 			_.each(page.urls,function (url) {
	// 				console.log('page url called')

	// 				var isDomain = this.isDomain(url,domain);
	// 				var isUnique = this.isUnique(url,queryUrls);

	// 				if(isDomain&&isUnique){
	// 					pageUrls.push(fetch(url));
	// 				}
	// 			});
	// 			return q.all(pageUrls);
	// 		}
	// 	},function (error) {
	// 		console.log(error);
	// 	});

	// 	return (scrape);
	// }

	// var request =	fetch(url).then(function () {
	// 	queries[index].result = eventUrls;
	// 	return eventUrls;
	// });

	return (request);

}

module.exports.result = this.result = function () {
	return queries;
}
module.exports.isDomain = this.isDomain = function (url,domain) {
	if(parser.getDomain(url)===domain){
		return true;
	}else{
		return false;
	}
}

module.exports.isUnique = this.isUnique = function (url,queryUrls) {
	_.each(queryUrls,function (queryUrl) {
		if(queryUrl == url){
			return false;
		}
	})
	return true;
}