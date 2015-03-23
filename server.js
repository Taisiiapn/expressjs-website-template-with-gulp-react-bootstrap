var express = require('express'),
	app = express(),
	path = require('path');

var dirRoot = process.cwd();

app
	.use(express.static(path.join(dirRoot, '/public')))
	.get('/left-sidebar-with-toggle.html', function(req, res) {
		//res.sendFile(path.join(dirRoot, '/src/main.html'));
		res.sendFile(path.join(dirRoot, '/src/views/left-sidebar-with-toggle.html'));
		//res.sendFile(path.join(dirRoot, req.path));
	})
	.get('/assessors.html', function(req, res) {
		//res.sendFile(path.join(dirRoot, '/src/main.html'));
		res.sendFile(path.join(dirRoot, '/src/views/assessors.html'));
		//res.sendFile(path.join(dirRoot, req.path));
	})
	.get('*', function(req, res) {
		//res.sendFile(path.join(dirRoot, '/src/main.html'));
		res.sendFile(path.join(dirRoot, '/src/views/index.html'));
		//res.sendFile(path.join(dirRoot, req.path));
	})
	.listen(3083);

console.log('Server up and listening on port 3083');


