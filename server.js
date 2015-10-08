// CALL THE PACKAGES WE NEED TO SET UP THE SERVER
// ==============================================
// Require Express Module
var express = require('express');
// Declare the variable 'app', create the Express Application
var app = express();
// bodyParser to expose various factories to create middlewares
var bodyParser = require('body-parser');
// Parses urlencoded bodies;  Extend option chooses parsing with qs library
app.use(bodyParser.urlencoded({ extended: true }));
// Parses json
app.use(bodyParser.json());
// Grab the mongoos package
var mongoose = require('mongoose');
// Connect to our local database, named directory auto generated
mongoose.connect('mongodb://localhost/blogs');
// Grab the blog post model
var Blog = require('./app/models/blog-post');
// Environment defined port, OR 8000
var port = process.env.PORT || 8000;
// Use built in middleware; pass the directory; use absolute path to directory to serve
app.use(express.static(__dirname + '/public'));


// API ROUTES - How our app responds to client requests
// ==========
// Get instance of Express Router to handle all our routes
var router = express.Router();
// All routes prefixed with /api; add to middleware stack
app.use('/api', router);
// Something to happen every time a request is sent to our API
router.use(function(req, res, next) {
    console.log('Something is HAPPENING...');
    // make sure we go to the next routes and don't stop here.
    next();
});
// Define the home route (accessed at GET localhost:8000/api)
router.get('/', function(req, res) {
    res.json({ message: 'YOLO! WELCOME to our API!' });
});
// app.route('/').get(function(req, res) {
//    res.sendFile('index.html', {root: __dirname + '/public'});
//  });

// To handle multiple routes for the same URI; all req that end in /blog-post
router.route('/blog-post')
  // Create a POST (accessed at POST localhost:8000/api/posts)
  .post(function(req, res) {
    // New instance of the Blog model
    var blog = new Blog();
    // Set the post title, author, content (comes from request)
    blog.title = req.body.title;
    blog.author = req.body.author;
    blog.content = req.body.content;
    // Save the post and check for errors
    blog.save(function(err) {
      if (err)
          res.send(err);
      res.json({ message: 'HIGH FIVE!!! Post created!' });
    });
  })
  // Get ALL the posts; chaining routes together...
  .get(function(req, res) {
    Blog.find(function(err, blogs) {
      if (err)
        res.send(err);
      res.json(blogs);
    });
  });

// To handle all requests that have a :blog_id--accessed through body-parser
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
        res.json({ message: 'Hell yeah! Blog updated!' });
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
        res.json({ message: "Blog Deleted, how sad" });
    });
  });

// START THE SERVER
app.listen(port);
console.log("Fancy stuff on port " + port);
