var http = require('http');

var url = process.argv[2];
http.get(url, function(response) {
	complete = "";
	response.on('data', function(data) {
		complete += data.toString();
	});
	response.on('end', function() {
		console.log(complete.length);
		console.log(complete);
	});
});
