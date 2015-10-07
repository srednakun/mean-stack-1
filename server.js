var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogs');

var Blog = require('./app/models/blog-post');

var port = process.env.PORT || 8000;

var router = express.Router();

app.use(express.static(__dirname + '/public'));

app.route('/').get(function(req, res) {
   res.sendFile('index.html', {root: __dirname + '/public'});
 });

router.route('/blog-post')

  .post(function(req, res) {

    var blog = new Blog();
    blog.title = req.body.title;
    blog.author = req.body.author;
    blog.content = req.body.content;

    blog.save(function(err) {
      if (err)
          res.send(err);

      res.json({ message: 'blog created!' });
    });
  })

  .get(function(req, res) {

    Blog.find(function(err, blogs) {
      if (err)
        res.send(err);

      res.json(blogs);
    });
  });

router.route('/blog-post/:blog_id')

  .get(function(req, res) {
    Blog.findById(req.params.blog_id, function(err, blog) {
      if (err)
        res.send(err);
      res.json(blog);
    });
  })

  .put(function(req, res) {

    Blog.findById(req.params.blog_id, function(err, blog) {
      if (err)
        res.send(err);

      blog.name = req.body.name;

      blog.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Blog updated!' });
      });
    });
  })

    .delete(function(req, res) {
      Blog.remove({
        _id: req.params.blog_id
      }, function(err, blog) {
          if (err)
            res.send(err);

          res.json({ message: "Blog Deleted, how sad" });

      });
    });


app.use('/api', router);

app.listen(port);
console.log("Fancy stuff on port " + port);
