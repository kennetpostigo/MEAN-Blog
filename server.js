var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	config = require('./app/config'),
	path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

app.use(morgan('dev'));

mongoose.connect(config.database);

app.use(express.static(__dirname + '/public'));

var apiRoutes = require('./app/routes/apiRoutes')(app, express);
app.use('/api', apiRoutes);

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(config.port);
console.log('Magic happens on port: ' + config.port);
