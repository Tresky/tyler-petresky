var express = require('express'), app = express();
var body_parser = require('body-parser');
var morgan = require('morgan');
var moment = require('moment');

var router = require('./routes/index.js');

app.locals.moment = moment;

// Middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(morgan('combined'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));

// Routes
app.use('/', router);

// Listen on port 3000
app.listen(3000);