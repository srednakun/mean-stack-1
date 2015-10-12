require('../app.js');

(function() {
  'use strict';

  angular.module('intellyApp').controller("BlogsCtrl", ["BlogsService", "$anchorScroll", "$location", function(BlogsService, $anchorScroll, $location) {
    var vm = this;

    vm.blogs = [];
    vm.delete = deleteBlog;
    vm.scroll = toBreadcrumbs;

    initialize();

    function initialize () {
      getBlogs();
    }

    function getBlogs () {
      BlogsService.get().then(function(resp) {
        // Set the property 'blogs' (array) equal to an array of objects
        vm.blogs = resp.data;
      });
    }

    function deleteBlog (blog) {
      BlogsService.delete(blog).then(function () {
        getBlogs();
      });
    }

    function toBreadcrumbs () {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('blog-scroll');

      // call $anchorScroll()
      $anchorScroll();
    }

  }]);
}());
