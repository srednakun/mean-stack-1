(function() {
  "use strict";

  // Declare variable app, which equals an new AngularJS module with name "intelly-blog"
  // ngRoute is a dependency used for routing and deeplinking services
  var app = angular.module("intelly-blog", ["ngRoute"]);

  //$routeProvider is used for configuring routes
  // App routes are declared with routeProvider
  app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/players", {
      templateUrl: "partials/players/players_list.html",
      controller: "PlayersCtrl as vm",
    })
    .otherwise({
      redirectTo: "/players",
    });
  }]);

}());
