var net = require('net');

function formatDate() {
	var d = new Date();
	var yy = d.getFullYear(),
		mm = d.getMonth() + 1,
		dd = d.getDate(),
		hh = d.getHours(),
		m = d.getMinutes();
	if (mm < 10)
		mm = "0" + mm;
	if (hh < 10)
		hh = "0" + hh;
	if (m < 10)
		m = "0" + m;
	return yy + '-' + mm + '-' + dd + ' ' + hh + ':' + m;
}
var port = Number(process.argv[2]);
var server = net.createServer(function(socket) {
	socket.write(formatDate() + '\n');
	socket.end();
});
server.listen(port);