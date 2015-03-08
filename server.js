var express = require('express'),
	app = express(),
	path = require('path');

var dirRoot = process.cwd();

/*
	Test React
*/
/*
React = require('react'),
MyApp = React.createFactory(require('./src/react/parent'));

var props = {};
var myAppHtml = React.renderToString(MyApp({}));

console.log(myAppHtml);
*/

app
	.use(express.static(path.join(dirRoot, '/public')))
	.get('*', function(req, res) {
		//res.sendFile(path.join(dirRoot, '/src/main.html'));
		res.sendFile(path.join(dirRoot, '/src/views/index.html'));
		//res.sendFile(path.join(dirRoot, req.path));
	})
	.listen(3083);

console.log('test server up and listening on port 3083');
//console.log(__dirname);
//console.log(process.cwd());


