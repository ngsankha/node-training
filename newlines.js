var fs = require('fs');

var filename = process.argv[2];
var data = fs.readFileSync(filename);
var lines = data.toString().split("\n");
console.log(lines.length - 1);
