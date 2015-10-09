(function () {
  angular.module("app").controller("BlogCtrl", ["$http", function ($http) {
    var vm = this;
    vm.posts = [];
    var urlRoot = "/api/blog-post";

    initialize();

    // function initialize() {
    //   BlogsService
    //     .get($routeParams.blog_id)
    //     .then(function (resp) {
    //       vm.blog = resp.data;
    //     });
    // }

    function initialize () {
      getPosts();
    }

    function get (id) {
      if (angular.isDefined(id)) {
          return $http.get(urlRoot + "/" + id);
        } else {
          return $http.get(urlRoot);
        }
    }

    function getPosts () {
      get().then(function (resp) {
        vm.posts = resp.data;
      });
    }

    console.log(vm.posts);

  }]);
})();

