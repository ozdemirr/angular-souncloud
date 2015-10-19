var index = angular.module('index', []);

    index.controller('IndexController', ['$rootScope', '$scope', 'souncloud', '$stateParams','$cookies','$timeout','$state',function($rootScope,$scope, souncloud,$stateParams,$cookies,$timeout,$state){

        //oauth handle
            if($stateParams.oauth_token){
                souncloud.oauth_token = $stateParams.oauth_token;
                souncloud.me()
                    .then(function(data){
                        $rootScope.user = data;
                        souncloud.userId = data.id;
                        $rootScope.user.oauth_token = $stateParams.oauth_token;
                        $cookies.putObject("user", $rootScope.user);
                        $state.go("stream");
                    });
            }

    }]);