var express = require('express'),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nodemailer = require('nodemailer');



app.locals.moment = require('moment');

var router = require('./routes/index.js');

// Middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

// Routes
app.use('/', router);


// Transporter object for nodemailer to use with my MailGun account.
var transporter = nodemailer.createTransport({
    service: 'MailGun',
    auth: {
        
    }
});

// Skeleton object holding message details for mail client.
var mail_options = {
    from: '',
    to: 'tnpetresky@gmail.com',
    subject: '',
    text: ''
};

// Connection established with client
io.on('connection', function(socket){
    console.log('User Connected');

    // Event triggers when a client disconnects from server.
    socket.on('disconnect', function() {
        console.log('User Disconnected');
    });

    // Event triggers when the contact form is submitted.
    // Will send me an email with the contents of their message.
    socket.on('contact submit', function(data) {
        mail_options.from = data.name + ' <' + data.from + '>';
        mail_options.subject = '[Website] ' + data.subject;
        mail_options.text = data.text;
        transporter.sendMail(mail_options, function(error, info) {
            if(error) {
                console.log(error);
                socket.emit('contact error');
            }
            else {
                console.log('Message sent: ' + info.response);
                socket.emit('contact success');
            }
        });
    });
});


// Listen on port 3000
http.listen(3000);