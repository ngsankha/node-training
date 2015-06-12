var http = require('http'),
	fs = require('fs');

var port = process.argv[2];
var file = process.argv[3];

var server = http.createServer(function(req, res) {
	var inp = fs.createReadStream(file);
	inp.pipe(res);
});

server.listen(port);