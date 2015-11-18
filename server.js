

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/blogs');

var Blog = require('./src/app/models/blog-post');

var port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://heroku_pwt28x0c:1mlgppvkauo4ppnqi4eirtbsfk@ds057224.mongolab.com:57224/heroku_pwt28x0c');


app.use(express.static(__dirname + '/public'));

var router = express.Router();
app.use('/api', router);
router.use(function(req, res, next) {
    console.log('Something is HAPPENING...');
    next();
});
router.get('/', function(req, res) {
    res.json({ message: 'YOLO! WELCOME to our API!' });
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
      res.json(blog);
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
  // Get a post with that id (accessed at GET localhost:8000/api/blog-post/:blog_id)
  .get(function(req, res) {
    Blog.findById(req.params.blog_id, function(err, blog) {
      if (err)
        res.send(err);
      res.json(blog);
    });
  })
  // Update a post (accessed at PUT localhost:8080/api/blog-post/:blog_id)
  .put(function(req, res) {
    // Use the blog model to find the post we want
    Blog.findById(req.params.blog_id, function(err, blog) {
      if (err)
        res.send(err);
      // Update the post info
      blog.title = req.body.title;
      blog.author = req.body.author;
      blog.content = req.body.content;
      // Save the post!
      blog.save(function(err) {
        if (err)
          res.send(err);
        res.json(blog);
      });
    });
  })
  // Delete a post (accessed at DELETE localhost:8080/api/blog-post/:blog_id)
  .delete(function(req, res) {
    Blog.remove({
      _id: req.params.blog_id
    }, function(err, blog) {
        if (err)
          res.send(err);
        res.json(blog);
    });
  });
// START THE SERVER
app.listen(port);
console.log("Running on port: " + port);

