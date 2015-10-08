(function() {
  "use strict";

  // Service added as a dependency
  angular.module("app").controller("BlogCtrl", ["BlogService", function (BlogService) {

    var vm = this;

    vm.blogs = [];
    vm.delete = deleteBlog;

    initialize();

    function initialize () {
      getBlogs();
    }

    function getBlogs() {
      BlogService.get().then(function (resp) {
        vm.blogs = resp.data;
        console.log(vm.blogs);
      });
    }

    function deleteBlog (blog) {
      BlogService.delete(blog).then(function () {
        getBlogs();
      });
    }
  }]);
})();
