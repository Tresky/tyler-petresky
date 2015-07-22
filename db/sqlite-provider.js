// sqlite-provider.js

var sqlite = require('sqlite3').verbose();

var ArticleProvider = function(path) {
    this.db = new sqlite.Database(path);

    var self = this;
    this.db.serialize(function() {
        self.db.run("CREATE TABLE IF NOT EXISTS articles (title TEXT, preview TEXT, timestamp INTEGER, body TEXT);");
    });
};

ArticleProvider.prototype.FindAll = function(callback) {
    var res = this.db.all("SELECT rowid, * FROM articles;", function(err, rows) {
        if (err)
            callback(err);
        else 
            callback(null, rows);
    });
};

ArticleProvider.prototype.FindById = function(id, callback) {
    var res = this.db.get("SELECT * FROM articles WHERE rowid = " + id + ";", function(err, row) {
        if (err)
            callback(err);
        else
            callback(null, row);
    });
};

ArticleProvider.prototype.AddComment = function(article_id, comment, callback) {

};

ArticleProvider.prototype.Save = function(article_info, callback) {
    var stmt = this.db.prepare("INSERT INTO articles VALUES (?, ?, ?, ?)");
    stmt.run(article_info.title, article_info.preview, new Date(), article_info.body);
    stmt.finalize();
    callback(null, null);
};

exports.ArticleProvider = ArticleProvider;