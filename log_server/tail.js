var fs = require('fs'),
    byline = require('byline'),
    os = require('os');

function tail(filename, numLines) {
  var updateLogListeners = [];
  var linesArray = [];
  var endLength = 0;
  var addLine = function(line) {
    linesArray.push(line);
    endLength += line.length;
    if (linesArray.length > numLines)
      linesArray.shift();
  };

  var stream = byline(fs.createReadStream(filename));
  stream.on('data', function(line) {
    line += os.EOL;
    addLine(line);
  });

  fs.watch(filename, function(event, fname) {
    if (event == 'change') {
      var inStream = byline(fs.createReadStream(filename, { start: endLength }));
      inStream.on('data', function(line) {
        line += os.EOL;
        addLine(line.toString());
        for (var i = 0; i < updateLogListeners.length; i++) {
          updateLogListeners[i](line.toString());
        }
      });
    }
  });

  return {
    on: function(event, callback) {
      if (event == 'update')
        updateLogListeners.push(callback);
    },

    getLines: function() {
      return linesArray.join('');
    }
  };
}

module.exports = tail;
