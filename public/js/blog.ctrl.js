(function () {

  angular.module("intellyApp").controller("BlogsCtrl", ["BlogsService", "$routeParams", function (BlogsService, $routeParams) {

    var vm = this;

    vm.posts = [];
    var urlRoot = "/api/blog-post";

    initialize();

    function initialize() {
      BlogsService
        .get($routeParams.blog_id)
        .then(function (resp) {
          vm.blog = resp.data;
          console.log(vm.blog + ' the bomb diggity');
          console.log(vm.blog[1]);
        });
    }

  }]);
})();

