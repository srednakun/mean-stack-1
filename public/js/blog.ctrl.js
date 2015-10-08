(function() {
  "use strict";

  // Service added as a dependency
  angular.module("intelly").controller("BlogCtrl", ["$http", function ($http) {

    var vm = this;
    var urlRoot = "/api/blog-post";

    var Blog = {
      get: function (id) {
        if (angular.isDefined(id)) {
          return $http.get(urlRoot + "/" + id);
        } else {
          return $http.get(urlRoot);
        }
    }

    vm.posts = [];

    initialize();

    function initialize () {
      getPosts();
    }

    function getPosts() {

      if (angular.isDefined(id)) {
        return $http.get(urlRoot + "/" + id);
      } else {
          return $http.get(urlRoot);
      }
    }
  }]);
})();

    // vm.delete = deleteBlog;

    // function deleteBlog (blog) {
    //   BlogService.delete(blog).then(function () {
    //     getBlogs();
    //   });
    // }

