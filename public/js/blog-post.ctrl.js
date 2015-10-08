(function () {
  angular.module("app").controller("BlogPostCtrl", ["BlogService", "$routeParams", function (PlayersService, $routeParams) {
    var vm = this;

    initialize();

    function initialize() {
      BlogService
        .get($routeParams.player_id)
        .then(function (resp) {
          vm.player = resp.data;
        });
    }
  }]);
})();
