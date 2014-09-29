'use strict';

var posts = require('../controllers/posts');


module.exports = function(Posts, app, auth) {

    app.route('/posts')
        .get(posts.all)
        .post(posts.create);
    app.route('/posts/api')
        .get(posts.api)
    app.route('/posts/:postId')
        .get(posts.show)
        .put(posts.update)
        .delete(auth.requiresLogin, posts.destroy);

    // Finish with setting up the articleId param
    app.param('postId', posts.post);
};


