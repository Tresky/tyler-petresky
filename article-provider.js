var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var Bson = require('mongodb').BSON;
var ObjectId = require('mongodb').ObjectID;

var ArticleProvider = function(host, port) {
    this.db = new Db('node-mongo-blog', new Server(host, port, {auto_reconnect: true}, {}));
    this.db.open(function() { });
};

ArticleProvider.prototype.GetCollection = function(callback) {
    this.db.collection('articles', function(error, article_collection) {
        if (error)
            callback(error);
        else
            callback(null, article_collection);
    });
};

ArticleProvider.prototype.FindAll = function(callback) {
    this.GetCollection(function(error, article_collection) {
        if (error)
            callback(error);
        else {
            article_collection.find().toArray(function(error, results) {
                if (error)
                    callback(error);
                else
                    callback(null, results);
            });
        }
    });
};

ArticleProvider.prototype.FindById = function(id, callback) {
    this.GetCollection(function(error, article_collection) {

        if (error)
            callback(error);
        else {
            article_collection.findOne({_id: ObjectId(id)}, function(error, result) {
                if (error)
                    callback(error);
                else
                    callback(null, result);
            });
        }
    });
};

ArticleProvider.prototype.AddCommentToArticle = function(article_id, comment, callback) {
    this.GetCollection(function(error, article_collection) {
        if (error)
            callback(error);
        else {
            article_collection.update(
                {_id: ObjectId(article_id)},
                {'$push': {comments: comment}},
                function(error, article) {
                    if (error)
                        callback(error);
                    else
                        callback(null, article);
                }
            );
        }
    });
};

ArticleProvider.prototype.Save = function(articles, callback) {
    this.GetCollection(function(error, article_collection) {
        if (error)
            callback(error);
        else {
            if (typeof(articles.length) == 'undefined')
                articles = [articles];

            for (var i = 0; i < articles.length; ++i) {
                article = articles[i];
                article.created_at = new Date();
                if (article.comments === undefined)
                    article.comments = [];
                for (var j = 0; j < article.comments.length; ++j)
                    article.comments[j].created_at = new Date();
            }

            article_collection.insert(articles, function() {
                callback(null, articles);
            });
        }
    });
};

exports.ArticleProvider = ArticleProvider;