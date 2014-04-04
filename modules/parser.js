var jsxml = require('jsxml');
var _ = require('lodash');

module.exports.fromXml = function fromXml (input) {
	return jsxml.fromXml(input);
};

module.exports.retreiveUrls = this.retreiveUrls = function retrieveUrls (json) {

	links = []
	function foundLink (link) {
	}
	( function find_link_refs( jsonml ) {
	  if ( jsonml[ 0 ] === "a" ) {
			links.push(jsonml[1].href);
	  }
	  else if ( Array.isArray( jsonml[ 1 ] ) ) {
	    jsonml[ 1 ].forEach( find_link_refs );
	  }
	  else if ( Array.isArray( jsonml[ 2 ] ) ) {
	    jsonml[ 2 ].forEach( find_link_refs );
	  }
	} )( json );

	return links;
}

module.exports.getDomain = this.getDomain = function (url) {
	//remove trailing slash
	if(url.charAt(url.length-1)==="/"){
		url = url.slice(0,url.length-1)
	}

	var domainRX = new RegExp('^http://.*?(?=/)|^http://.*\.*$');
	var reg = domainRX.exec(url);
	if(reg){
		return reg[0];
	}else {return false};
}

var EventTriggers = [
	'January'
];

var i = 0;
for (; i < EventTriggers.length; i++) {
	var Trigger = EventTriggers[i];
	EventTriggers[i] = new RegExp(Trigger)
}


module.exports.isEvent = this.isEvent = function (json) {

	var isEvent = false;

	var i = 0;
	
	for (; i < EventTriggers.length; i++) {
		var EventRX = EventTriggers[i];

		(function findRX (json) {

			var i = 0;
			for(; i < json.length;i++){

				if(Array.isArray(json[i])){
					findRX(json[i]);
				}else{
					var event = EventRX.exec(json[i]);
					if (event !== null){				
						isEvent = true;
					}
				}
			}
		})(json)

	}

	return isEvent;

}

