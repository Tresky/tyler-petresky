var express = require('express'),
    router = express.Router();
var transporter = require('../mailer.js');
var ArticleProvider = require('../db/sqlite-provider.js').ArticleProvider;
var showdown = require('showdown');
var converter = new showdown.Converter();

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

var article_provider = new ArticleProvider('./db/blogdb.db');

router.get('/blog', function(req, res) {
    article_provider.FindAll(function(err, docs) {
        if (err)
            console.log('Error: ' + err);
        else
            res.render('./blog/blog-list.jade', {
                title: 'Test Blog',
                articles: docs
            });
    });
});

router.get('/blog/new', function(req, res) {
    article_provider.FindAll(function(err, docs) {
        if (err)
            console.log('Error: ' + err);
        else
            res.render('./blog/blog-new.jade');
    });
});

router.post('/blog/new', function(req, res){
    console.log('NOTICE ME SENPAI!!!');


    article_provider.Save({
        title: req.param('title'),
        preview: req.param('preview'),
        body: req.param('body')

    }, function(err, docs) {
        if (err)
            console.log('Error: ' + err);
        else
            res.redirect('/blog')
    });
});

router.get('/blog/:id', function(req, res) {
    article_provider.FindById(req.params.id, function(err, article) {
        if (err)
            console.log('Error: ' + err);
        else
            res.render('./blog/blog-post.jade', {
                title: article.title,
                timestamp: article.timestamp,
                body: converter.makeHtml(article.body)
            });
    });
});

// router.post('/blog/add-comment', function(req, res) {
//     article_provider.AddCommentToArticle(req.param('_id'), {
//         person: req.param('person'),
//         comment: req.param('comment'),
//         created_at: new Date()
//        } , function(error, docs) {
//            res.redirect('/blog/' + req.param('_id'))
//        });
// });

module.exports = router;