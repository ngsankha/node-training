var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

if (process.argv.length < 4) {
  console.log("Usage: node index.js [filename] [port]");
  process.exit(-1);
}

var filename = process.argv[2],
    port = process.argv[3];

var tail = require('./tail')(filename, 10);

tail.on('update', function(chunk) {
  io.emit('chunk', chunk);
});

app.get('/', function(req, res) {
  res.send("log server");
});

app.get('/log', function(req, res) {
  res.sendFile(__dirname + '/log.html');
});

io.on('connection', function(socket) {
  console.log("User connected: Sending entire log");
  io.emit('initial log', tail.getLines());
});

http.listen(port, function() {
  console.log("Listening on *:" + port);
});
