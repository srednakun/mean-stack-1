(function () {

  "use strict";

  angular.module("intellyApp").controller("BlogFormCtrl", ["BlogsService", "$routeParams", "$location", "$http", function (BlogsService, $routeParams, $location, $http) {

    var vm = this;

    vm.save = submitForm;

    vm.blog = {};

    initialize();

    function initialize () {
      if ($routeParams.blog_id) {
        BlogsService.get($routeParams.blog_id).then(function (resp) {
          vm.blog = resp.data;
        });
      }
    }

    function submitForm () {

      var method;

      method = $routeParams.blog_id ? "update" : "create";

      BlogsService[method](vm.blog).then(function (resp){
        console.log(resp.data._id);
        $location.path("/blog-post/" + resp.data._id);
      });
    }

      function deleteBlog (blog) {
        BlogsService.delete(blog).then(function () {
        getBlogs();
      });
    }

  }]);
}());
