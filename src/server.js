var express = require('express'),
	app = express(),
	path = require('path');

var dirRoot = process.cwd();

app
	.use(express.static(path.join(dirRoot, '/public')))
	.get('*', function(req, res) {
		res.sendFile(path.join(dirRoot, '/src/views/index.html'));
	})
	.listen(3083);

console.log('Server up and listening on port 3083');
