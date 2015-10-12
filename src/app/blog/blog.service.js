require('../app.js');

// Organize and share code around out app
(function () {

  "use strict";

  // Name the service and specify the $http service as a dependency -- inject it to use it
  angular.module("intellyApp").service("BlogsService", ["$http", function ($http) {

    // Declare urlRoot
    var urlRoot = "/api/blog-post";

    // Declare blog object with 4 methods
    var Blog = {
      // Get function with blog post ID as argument
      // Function will return a promise
      get: function (id) {
        // Determine if a reference (post ID) is defined
        if (angular.isDefined(id)) {
          // Send in the URL with ID to the get method
          return $http.get(urlRoot + "/" + id);
        } else {
          // Send in the base URL
          return $http.get(urlRoot);
        }
      },
      update: function (model) {
        return $http.put(urlRoot + "/" + model._id, model);
      },
      create: function (model) {
        return $http.post(urlRoot, model);
      },
      delete: function (model) {
        return $http.delete(urlRoot + "/" + model._id);
      }
    };
    return Blog;
  }]);
}());
