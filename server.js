
// Call the packages we need to set up our server
// Require express module
var express = require("express");

// Declare the variable app as an express function which creates the express application
var app = express();

/*
*
* Require the body-parser module, which allows us to pull POST Content
* from our HTTP request (i.e. to create a blog post)
*
*/

// The bodyParser object actually exposes various factories to create middlewares.
// Middlewares being the bridge between applications and databases.
// All middlewares will populate the req.body property with the parsed body
// or provide an error to the callback.
var bodyParser = require("body-parser");

/*
*
* Configure the app to use bodyParser()
* this will let us get the data from a POST
*
*/
// Returns middleware that only parses urlencoded bodies
// The extended option allows to choose between parsing the URL-encoded data
// with the querystring library (when false) or the qs library (when true).
// The "extended" syntax allows for rich objects and arrays to be encoded
// into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
app.use(bodyParser.urlencoded({ extended: true }));

// Returns middleware that only parses json
app.use(bodyParser.json());

// Serving our files, such as images, CSS, JavaScript and other static files
// with the help of a built-in middleware in Express - express.static.
// Pass the name of the directory, which is to be marked as the location of
// static assets to the express.static middleware to start serving the files directly.
// The path you provide to express.static is relative to the directory where you launch
// your node process. So, it's safer to use the absolute path of the directory you want
// to serve...in case you run the express app from another directory.
app.use('/', express.static(__dirname + '/public'));

// Set our port
// Environment defined port, or 3000
var port = process.env.PORT || 3000;

// Grab the mongoose package
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogapp'); // connect to our local database -- name it to create

// Grab the blog post model
var Blog = require('./src/models/blog-post');



/*
*
* Routes for our API
* Meaning: How our application responds to a client request to a particular endpoint,
*          which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
*          Each route can have one or more handler functions, which is/are executed when the route is matched.
*
*/
// Get an instance of the express Router to handle all our routes
// The express.Router class can be used to create modular mountable route handlers.
// A Router instance is a complete middleware and routing system; for this reason it is often referred to as a “mini-app”.
var router = express.Router();

// Register the API routes
// all of our routes will be prefixed with /api
// app.use will add to the middleware stack
app.use('/api', router);

// Middleware to use for all requests
// Basically, we want something to happen every time a request was sent to our API...so log it
router.use(function(req, res, next) {
    // do logging
    console.log('Something is HAPPENING...');
    next(); // make sure we go to the next routes and don't stop here. This is important because our app would stop at this middleware without it.
});

// Define the home route, sending a JSON response to test to make sure everything is working
// (accessed at GET http://localhost:3000/api)
// Sending back information as JSON data. This is standard for an API and will help the people using our API to use our data.
router.get('/', function(req, res) {
    res.json({ message: 'WHOOT WHOOP! WELCOME to our API!' });
});


/*
*
* Overview of the routes we will require, what they will do, and the HTTP Verb used to access it.
*
* Route  HTTP Verb Description
* /api/posts  GET Get all the posts.
* /api/posts  POST Create a post.
* /api/posts/:post_id GET Get a single post.
* /api/posts/:post_id PUT Update a post with new info.
* /api/posts/:post_id DELETE Delete a post.
*
*/

// Use Express’s router.route() to handle multiple routes for the same URI
// Handle all the requests that end in /posts
router.route('/posts')

// create a POST (accessed at POST http://localhost:8080/api/posts)
// created the POST route for our application
.post(function(req, res) {

  var blogPost = new Blog();      // create a new instance of the Blog model
  blogPost.title = req.body.title;  // set the blogPost title (comes from the request)

  // save the blogPost and check for errors
  blogPost.save(function(err) {
    if (err)
        res.send(err);
    res.json({ message: 'HIGH FIVE! Post created!' });
    });
  })
  // Get all the posts:
  // With router.route(), we are able to chain together the different routes.
  // This keeps our application clean and organized.
  .get(function(req, res) {
    Blog.find(function(err, posts) {
      if (err)
        res.send(err);
      res.json(posts);
    });
  });




// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);


