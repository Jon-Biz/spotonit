var _ = require('lodash');
var q = require('q');

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

	function fetch (url) {

		return (urltreiver(url).then(function (result) {
					var json = parser.fromXml(result);
					var page = parser.process(json);
		
					if(page.isEvent){
						eventUrls.push(url);
					}
		
					if(page.urls){
						var pageUrls = [];
						_.each(page.urls,function (url) {
							pageUrls.push(fetch(url));
							return q.all(pageUrls);
						})
					};
		
				},function (error) {
					console.log(error);
				}));
	}

	fetch(url).then(function () {
		queries[index].result = eventUrls
	});
}
