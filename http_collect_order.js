var http = require('http');

var arr = [];
var completed = 0;

function printData() {
	if (completed == 3) {
		for (var i = 0; i < 3; i++)
			console.log(arr[i]);
	}
}

function sendReq(url, id, callback) {
	http.get(url, function(res) {
		var str = "";
		res.on('data', function(data) {
			str += data;
		});
		res.on('end', function() {
			arr[id] = str;
			completed++;
			callback();
		});
	});
}

for (var i = 0; i < 3; i++)
	sendReq(process.argv[2 + i], i, printData);
