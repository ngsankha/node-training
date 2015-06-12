var fs = require('fs'),
    path = require('path');

module.exports = function(dir, ext, callback) {
	fs.readdir(dir, function(err, list) {
		if (err)
			callback(err, []);
		else {
			var filtered_list = [];
			for (var i = 0; i < list.length; i++) {
				if (path.extname(list[i]) == '.' + ext)
					filtered_list.push(list[i]);
			}
			callback(null, filtered_list);
		}
	});
};
