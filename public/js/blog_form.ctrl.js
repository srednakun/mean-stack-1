(function () {

  "use strict";

  angular.module("intellyApp").controller("BlogFormCtrl", ["BlogsService", "$routeParams", "$location", "$http", function (BlogsService, $routeParams, $location, $http) {

    var vm = this;

    var urlRoot = "/api/blog-post";

    vm.save = submitForm;

    vm.blog = {};



    // initialize();

    // function get (id) {
    //   if (angular.isDefined(id)) {
    //     return $http.get(urlRoot + "/" + id);
    //   } else {
    //     return $http.get(urlRoot);
    //   }
    // }

    // function initialize () {
    //   if ($routeParams.blog_id) {
    //     get($routeParams.blog_id).then(function (resp) {
    //       vm.blog = resp.data;
    //     });
    //   }
    // }

    function create(model) {
        return $http.post(urlRoot, model);
    }

    function submitForm () {

      var method;

      // if (angular.isDefined(vm.post.number)) {
      //   vm.post.number = parseInt(vm.post.number, 10);
      // }

      // method = $routeParams.blog_id ? "update" : "create";
      create(vm.blog).then(function (resp) {
        console.log(resp.data + "heloooooo");
// $location.path("/blog-post/" + resp.data._id);
      });
    }
  }]);
}());


