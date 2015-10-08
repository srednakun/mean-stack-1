(function () {
  angular.module("app").controller("BlogCtrl", ["BlogsService", "$routeParams", function (BlogsService, $routeParams) {
    var vm = this;
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
})();

