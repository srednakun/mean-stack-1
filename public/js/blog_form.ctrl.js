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
  }]);
}());


