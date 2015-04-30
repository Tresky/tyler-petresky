var express = require('express'),
    router = express.Router();
var transporter = require('../mailer.js');

// Middleware specific to this router.
router.use(function TimeLog(res, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// Handles incoming AJAX into the page. ie. contact submission.
var HandleAjax = function(req, res, next) {
    if (req.xhr) {
        console.log('Ajax Detected');

        var mail_options = {
            from: req.query.name + ' <' + req.query.from + '>',
            to: 'tnpetresky@gmail.com',
            subject: '[Website] ' + req.query.subject,
            text: req.query.text
        };

        // Send email to myself from interested party.
        transporter.sendMail(mail_options, function(error, info) {
            if (error) {
                console.log('Failed to send message: ' + error);
                res.send('contact error');
            }
            else {
                console.log('Message sent: ' + info.response);
                res.send('contact success');
            }
        });
    }
    else
        next();
}

// Handles rendering the page if no AJAX
var HandlePageLoad = function(req, res, next) {
    console.log('Rendering');
    res.render('layout.jade');
}

// Define the home page route
router.get('/', [HandleAjax, HandlePageLoad]);

module.exports = router;