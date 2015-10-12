require('../app.js');

(function() {

  'use strict';

  angular.module('intellyApp').controller("BlogsCtrl", ["BlogsService", "$anchorScroll", "$location", function(BlogsService, $anchorScroll, $location) {

    var vm = this;

    // Initialize blogs to an empty array
    // (since our page will render before data returns from get request)
    vm.blogs = [];

    // Create delete method using deleteBlog function
    vm.delete = deleteBlog;
    // Create scroll method using toBreadcrumbs function
    vm.scroll = toBreadcrumbs;

    // Initialize the controller
    initialize();

    function initialize () {
      getBlogs();
    }

    function getBlogs () {
      // Run the get method from the BlogsService service
      // Then (or success) send in a callback with the response (from promise)
      BlogsService.get().then(function(resp) {
        // Store the data in the blogs array
        // Set the property 'blogs' (array) equal to an array of objects
        vm.blogs = resp.data;
        console.log(vm.blogs);
        if (vm.blogs.length === 0) {
          return false;
        }
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
