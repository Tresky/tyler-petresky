var express = require('express'),
    app = express();

var router = require('./routes/index.js');

// Middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/', router);
// app.use('/about', router);

// Listen on port 3000
app.listen(3000);