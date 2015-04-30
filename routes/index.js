var express = require('express'),
    router = express.Router();

// Middleware specific to this router
router.use(function timeLog(res, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// Define the home page route
router.get('/', function(req, res) {
    res.render('layout.jade');
});

// Define the about page route
router.get('/about', function(req, res) {
    res.render('../views/about.jade');
});

module.exports = router;