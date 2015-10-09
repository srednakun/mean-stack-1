(function () {

  "use strict";

  angular.module("intellyApp").controller("BlogFormCtrl", ["BlogsService", "$routeParams", "$location", "$http", function (BlogsService, $routeParams, $location, $http) {

    var vm = this;

    vm.save = submitForm;

    vm.post = {};

    initialize();

    function initialize () {
      if ($routeParams.blog_id) {
        BlogsService.get($routeParams.blog_id).then(function (resp) {
          vm.post = resp.data;
        });
      }
    }

    function submitForm () {

      var method;

      if (angular.isDefined(vm.post.number)) {
        vm.post.number = parseInt(vm.post.number, 10);
      }

      method = $routeParams.blog_id ? "update" : "create";
      BlogsService.create(vm.post).then(function (resp) {
        $location.path("/blog-post/" + resp.data._id);
      });
    }
  }]);
}());
