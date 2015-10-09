(function() {

  "use strict";

  // Declare variable app, which equals a new AngularJS module
  // with the name 'intelly'. ngRoute is a dependency used for
  // routing and deeplinking services
  var app = angular.module('intellyApp', ["ngRoute"]);

  // $routeProvider is a provider in the ngRoute module
  // used for configuring routes.
  // App routes are declared with $routeProvider.
  app.config(["$routeProvider", function($routeProvider) {
      // The $location service parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application
      // This method is getter / setter.

      // Return path of current url
      // Add a new route definition to the $route service.
      // The route path (/blog-post) is (matched against $location.path)
      // which is a getter/setter that parses the address bar url
      // and makes it available to our app
      $routeProvider.when('/blog-post', {
        // This is the route object:
        templateUrl: "js/partials/blog-post.html",
        controller: "BlogsCtrl as vm"
      }).
      when('/blog-post/new', {
        templateUrl: "js/partials/blog-post-form.html",
        controller: "BlogFormCtrl as vm",
      }).
      when('/blog-post/:blog_id', {
        templateUrl: "js/partials/blog-post-detail.html",
        controller: "BlogCtrl as vm"
      }).
       when('/blog-post/:blog_id/edit', {
        templateUrl: "js/partials/blog-post-detail.html",
        controller: "BlogsCtrl as vm"
      })
      .otherwise({
        redirectTo: "/blog-post"
      });
    }]);

})();
