var nodemailer = require('nodemailer');

// Transporter object for nodemailer to use with my MailGun account.
var transporter = nodemailer.createTransport({
    service: 'MailGun',
    auth: {
        user: 'user',
        pass: 'pass'
    }
});

module.exports = transporter;