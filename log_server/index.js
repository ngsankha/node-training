var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    fs = require('fs'),
    byline = require('byline'),
    os = require('os');

if (process.argv.length < 4) {
  console.log("Usage: node index.js [filename] [port]");
  process.exit(-1);
}

var filename = process.argv[2],
    port = process.argv[3];

var lines10 = [];
var addLine = function(line) {
  lines10.push(line);
  if (lines10.length > 10)
    lines10.shift();
};

var stream = byline(fs.createReadStream(filename));
var endLength = 0;
stream.on('data', function(line) {
  line += os.EOL;
  addLine(line);
  endLength += line.length;
});

fs.watch(filename, function(event, fname) {
  if (event == 'change') {
    var inStream = byline(fs.createReadStream(filename, { start: endLength }));
    var text = '';
    inStream.on('data', function(line) {
      line += os.EOL;
      addLine(line.toString());
      endLength += line.length;
      io.emit('chunk', line.toString());
    });
  }
});

app.get('/', function(req, res) {
  res.send("log server");
});

app.get('/log', function(req, res) {
  res.sendFile(__dirname + '/log.html');
});

io.on('connection', function(socket) {
  console.log("User connected: Sending entire log");
  io.emit('initial log', lines10.join(""));
});

http.listen(port, function() {
  console.log("Listening on *:" + port);
});
