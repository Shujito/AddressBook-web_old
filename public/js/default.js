window.Utils = window.Utils || {};
window.Utils.serializeInputs = function(selector) {
	var fields = $(selector);
	var values = fields.serializeArray();
	var json = {};
	for(var idx in values) {
		json[values[idx].name] = values[idx].value;
	}
	return json;
};

$('a').on('click',function(e) {
	window.location.replace(this.href);
	return false;
});