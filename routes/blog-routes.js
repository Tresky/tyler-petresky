var express = require('express'),
    router = express.Router();

var ArticleProvider = require('../db/sqlite-provider.js').ArticleProvider;
var showdown = require('showdown');
var converter = new showdown.Converter();

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

module.exports = router;