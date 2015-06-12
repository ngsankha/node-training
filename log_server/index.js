var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    fs = require('fs');

var filename = process.argv[2],
    port = process.argv[3];

var data = fs.readFileSync(filename).toString();
fs.watch(process.argv[2], function(event, fname) {
  if (event == 'change') {
    var inStream = fs.createReadStream(filename, { start: data.length });
    var text = '';
    inStream.on('data', function(chunk) {
      text += chunk.toString();
    });
    inStream.on('end', function() {
      data += text;
      io.emit('chunk', text);
    });
  }
});
var inStream = fs.createReadStream(process.argv[2], { autoClose: false });
var text = "";


app.get('/', function(req, res) {
  res.send("log server");
});

app.get('/log', function(req, res) {
  res.sendFile(__dirname + '/log.html');
});

io.on('connection', function(socket) {
  console.log("User connected: Sending entire log");
  io.emit('initial log', data);
});

http.listen(process.argv[3], function() {
  console.log("Listening on *:" + process.argv[3]);
});
