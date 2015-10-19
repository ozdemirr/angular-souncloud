app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/index');

    // Redirect any unresolved url
    $urlRouterProvider.otherwise("/index");

    $stateProvider

        .state('indexOauth', {
            url: "/index/:oauth_token",
            templateUrl: "modules/index/index.view.html",
            controller: "IndexController"
        })

        .state('index', {
            url: "/index",
            templateUrl: "modules/index/index.view.html",
            controller: "IndexController"
        })

        .state('stream', {
            url: "/stream",
            templateUrl: "modules/user/stream.view.html",
            controller: "StreamController"
        })

        .state('likes', {
            url: "/likes",
            templateUrl: "modules/user/likes.view.html",
            controller: "LikesController"
        })
}]);
