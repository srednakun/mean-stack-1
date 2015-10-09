(function() {
  'use strict';

  angular.module('intellyApp').controller("BlogsCtrl", ["BlogsService", function(BlogsService) {
    var vm = this;

    vm.blogs = [];
    vm.delete = deleteBlog;

    initialize();

    function initialize () {
      getBlogs();
    }

    function getBlogs () {
      BlogsService.get().then(function(resp) {
        vm.blogs = resp.data;
      });
    }

    function deleteBlog (blog) {
      BlogsService.delete(blog).then(function () {
        getBlogs();
      });
    }
  }]);
}());
