var http = require('http'),
	url = require('url');

var port = process.argv[2];
var server = http.createServer(function(req, res) {
	if (req.method == 'GET') {
		var parsedUrl = url.parse(req.url, true);
		var obj;
		if (parsedUrl.pathname == '/api/parsetime') {
			var d = new Date(parsedUrl.query['iso']);
			obj =  {
				hour: d.getHours(),
				minute: d.getMinutes(),
				second: d.getSeconds()
			}
		} else if (parsedUrl.pathname == '/api/unixtime') {
			var d = new Date(parsedUrl.query.iso);
			obj = {
				unixtime: d.getTime()
			}
		}
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(obj));
	}
});
server.listen(port);
