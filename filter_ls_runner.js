var dir = process.argv[2],
    ext = process.argv[3];

var filtered_ls = require('./filter_ls');
filtered_ls(dir, ext, function(err, list) {
	if (!err) {
		for (var i = 0; i < list.length; i++)
			console.log(list[i]);
	}
});
