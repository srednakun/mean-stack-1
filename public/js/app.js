(function() {
  "use strict"

  var app = angular.module('intellyApp', ["ngRoute"]);


  app.config(["$routeProvider", function($routeProvider) {
      $routeProvider.when('/blog-post', {
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
      }).
       otherwise({
        redirectTo: "/blog-post"
      });
    }]);



  // var blogs = [

  // {
  //   title: 'Integer dictum erat et',
  //   author: 'Goose',
  //   content: 'The secular cooling that must someday overtake our planet has already gone far indeed with our neighbour. Its physical condition is still largely a mystery, but we know now that even in its equatorial region the midday temperature barely approaches that of our coldest winter. Its air is much more attenuated than ours its oceans have shrunk until they ',
  //   date: 'August 23, 1976'

  // },

  // {
  //   title: 'Integer dictum erat et',
  //   author: 'Maverick',
  //   content: 'The secular cooling that must someday overtake our planet has already gone far indeed with our neighbour. Its physical condition is still largely a mystery, but we know now that even in its equatorial region the midday temperature barely approaches that of our coldest winter. Its air is much more attenuated than ours its oceans have shrunk until they ',
  //   date: 'August 23, 1976'

  // },
  //   {
  //   title: 'Integer dictum erat et',
  //   author: 'Viper',
  //   content: 'The secular cooling that must someday overtake our planet has already gone far indeed with our neighbour. Its physical condition is still largely a mystery, but we know now that even in its equatorial region the midday temperature barely approaches that of our coldest winter. Its air is much more attenuated than ours its oceans have shrunk until they ',
  //   date: 'August 23, 1976'

  // },
  //   {
  //   title: 'Integer dictum erat et',
  //   author: 'Iceman',
  //   content: 'The secular cooling that must someday overtake our planet has already gone far indeed with our neighbour. Its physical condition is still largely a mystery, but we know now that even in its equatorial region the midday temperature barely approaches that of our coldest winter. Its air is much more attenuated than ours its oceans have shrunk until they ',
  //   date: 'August 23, 1976'

  // }

  // ];

})();
