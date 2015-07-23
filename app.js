// app.js

// Load dependencies
var express = require('express'), app = express();
var body_parser = require('body-parser');
var morgan = require('morgan');
var moment = require('moment');
var sass = require('node-sass-middleware');

// Load routers
var main_router = require('./routes/main-routes.js');
var blog_router = require('./routes/blog-routes.js');

app.locals.moment = moment;

// Middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));
app.use(
    sass({
        src: __dirname + '/sass',
        dest: __dirname + '/public/css',
        prefix: '/css',
        debug: true
    })
);
app.use(express.static(__dirname + '/public'));

// Routes
app.use(main_router);
app.use(blog_router);

// Listen on port 3000
app.listen(3000);