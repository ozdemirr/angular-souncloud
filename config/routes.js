app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/');

    // Redirect any unresolved url
    $urlRouterProvider.otherwise("/");

    $stateProvider

        .state('index', {
            url: "/",
            templateUrl: "modules/index/index.view.html",
            controller: "IndexController",
            data: {
                requireLogin: false
            }
        })

}]);
