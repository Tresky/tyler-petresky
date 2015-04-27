var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    serive: 'Gmail',
    auth: {
        user: 'letslearncpp@gmail.com',
        pass: 'phdrumline963'
    }
});

var mailOptions = {
    from: 'Fred Foo <foo@blurdybloop.com>', // sender address
    to: 'tnpetresky@gmail.com', // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world', // plaintext body
    html: '<b>Hello world</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});