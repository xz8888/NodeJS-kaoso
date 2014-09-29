'use strict';
/*
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Category = mongoose.model('Category'),
    _ = require('lodash'),
    http = require('http'),
    config = require('meanio').loadConfig();

exports.post = function(req, res, next, id) {
    Post.load(id, function(err, post) {
        if (err) return next(err);
        if (!post) return next(new Error('Failed to load post ' + id));
        req.post = post;
        next();
    });
};

exports.create = function(req, res) {
    var post = new Post(req.body);
	post.user = req.user;    

    post.save(function(err){
    	if (err) {
            return res.jsonp(500, {
                error: 'Cannot save the post'
            });
        }
        res.jsonp(post);
    });
};

exports.update = function(req, res){

};

exports.destroy = function(req, res){

};

exports.show = function(req, res){
   res.jsonp(req.post);
};

exports.api = function(req, res){
     var remote_url = config.yuna.url;
     var remote_key = config.yuna.key;

     var options = {
        host: remote_url,
        port: 3001, 
        path: '/posts', 
        method: 'GET'
     };

     var req = http.request(options, function(res){
        var output = "";
        console.log('Status ' + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            output += chunk;
        });

        res.on('end', function(){
            var obj = JSON.parse(output);
            _.each(obj, function(post){
                //check if the record already exists
                var importPost = post;
                Post.find(({title: post.title}), function(error, result){

                    if (result.length == 0){
                        console.log('are you there');
                        var post = new Post({
                            title: importPost.title,
                            content: importPost.body,
                            approved: 1,
                        })

                        post.save(function(err){
                            if (err) {
                                console.log(err);
                            }

                            var category = new Category({
                                name: importPost.category
                            })

                            category.save(function(err){
                                if (err) {
                                   console.log(err);
                                }
                            })

                        });
                    }
                    else
                        console.log('Post already exists');
                });
                //write the post to database
            })
        })
     });

     req.end();

     req.on('error', function(e){
        console.log(e);
     })
};

exports.all = function(req, res){
  Post.find().sort('-created').populate('user', 'name username').exec(function(err, posts) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the articles'
            });
        }
        res.jsonp(posts);

    });
};