var jsxml = require('jsxml');

module.exports = function(input) {
	return jsxml.fromXml(input);
};