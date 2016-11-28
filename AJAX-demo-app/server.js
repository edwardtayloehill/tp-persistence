var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
	console.log('Request:', req.method, req.url);
	next();
});

app.get('/', function (req, res, next) {
	res.sendFile(__dirname + '/index.html', next);
});

var babyNames = [{
	name: 'kid',
	type: 'goat'
}, {
	name: 'calf',
	type: 'hippo'
}, {
	name: 'foal',
	type: 'horse'
}, {
	name: 'joey',
	type: 'kangaroo'
}];

app.get('/babes', function (req, res, next) {
	res.json(babyNames);
});

app.use(function (err, req, res, next) {
	console.error(err);
	res.status(err.status || 500).end();
});

var port = 3000;
app.listen(port, function () {
	console.log('Hungrily listening on port', port);
});