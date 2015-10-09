(function () {

  "use strict";

  angular.module("intellyApp").controller("BlogFormCtrl", ["BlogsService", "$routeParams", "$location", function (BlogsService, $routeParams, $location) {

    var vm = this;

    vm.save = saveForm;

    vm.post = {};

    initialize();

    function initialize () {
      if ($routeParams.blog_id) {
        BlogsService.get($routeParams.blog_id).then(function (resp) {
          vm.post = resp.data;
        });
      }
    }

    function saveForm () {
      var method;

      if (angular.isDefined(vm.post.number)) {
        vm.post.number = parseInt(vm.post.number, 10);
      }

      method = $routeParams.blog_id ? "update" : "create";
      PlayersService[method](vm.player).then(function (resp) {
        $location.path("/players/" + resp.data._id);
      });
    }
  }]);
}());
