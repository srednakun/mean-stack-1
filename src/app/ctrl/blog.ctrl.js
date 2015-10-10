require('../app.js');

(function () {

  angular.module("intellyApp").controller("BlogCtrl", ["BlogsService", "$routeParams", function (BlogsService, $routeParams) {

    var vm = this;

    vm.posts = [];
    var urlRoot = "/api/blog-post";

    initialize();

    function initialize() {
      BlogsService
        .get($routeParams.blog_id)
        .then(function (resp) {
          vm.blog = resp.data;
        });
    }

  }]);
}());

