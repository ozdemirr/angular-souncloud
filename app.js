var app = angular.module('soundcloudApp', [
    'ui.bootstrap',
    'index',
    'shared',
    'cgNotify',
    'angular-loading-bar',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'ui.utils',
    'ngCookies',
    'user'
]);

app.config(['soundcloudConfigProvider',function(soundcloudConfigProvider){
    soundcloudConfigProvider.clientId = "9a3c52983a5b588452e8ab35cce81fa9";
}]);


app.run(['$rootScope', '$cookies', 'souncloud','$state','$timeout',function($rootScope,$cookies,souncloud,$state,$timeout) {
    $rootScope.clientId = "9a3c52983a5b588452e8ab35cce81fa9";
    $rootScope.redirectUri = "http://ozdemirr.github.io/angular-souncloud/callback.html";

    if($cookies.get('user')){
        var userJson = angular.fromJson($cookies.get('user'));
        souncloud.userId = userJson.id;
        souncloud.oauth_token = userJson.oauth_token;
        $timeout(function() {
            $state.go("stream");
        });
        souncloud.me()
            .then(function(data){
                $rootScope.user = data;
                $rootScope.user.oauth_token = userJson.oauth_token;
                $cookies.putObject("user", $rootScope.user);
            });
    }

}]);

app.directive('aplayer',function($interval) {
    return {
        restrict:'A',
        scope: {
            audobj: '=',
            waveform:'='
        },
        templateUrl: 'modules/shared/views/player.html',
        link: function($scope, element, attrs){
        },
        controller: function($scope){
            if(typeof $scope.audobj == "string"){
                $scope.audio = new Audio();
                $scope.audio.src = $scope.audobj;
                $scope.vol = 0.6;
                $scope.audio.volume = 0.6;
            }

            $scope.$watch('waveform', function() {

                if(!angular.isUndefined($scope.waveform)){

                    angular.element(document.getElementsByClassName("rangewrap")).css('background-image','url(' + $scope.waveform + ')');

                }

            });

            $scope.mute = function(){

                if(!$scope.previousVol){
                    $scope.previousVol = angular.copy($scope.vol);
                    $scope.vol = $scope.vol = 0;
                    $scope.audio.volume = $scope.audio.volume = 0;
                }else{
                    $scope.vol = $scope.vol = angular.copy($scope.previousVol);
                    $scope.audio.volume = angular.copy($scope.previousVol);
                    delete $scope.previousVol;
                }

            };

            $scope.$watch('audobj', function() {
                $scope.audio.pause();
                $scope.ctime = $scope.audio.currentTime.toFixed(1);
                $scope.audio = new Audio();
                $scope.audio.src = $scope.audobj;
                $scope.vol = 0.6;
                $scope.audio.volume = 0.6;
                $scope.audio.play();
            });
            $scope.play = function(){
                $scope.audio.play();
            };
            $scope.pause = function(){
                $scope.audio.pause();
            };
            $interval(function(){
                $scope.ctime = $scope.audio.currentTime.toFixed(1);
            },100);
            $scope.$watch('audio.duration', function(newval){
                $scope.duration = $scope.audio.duration.toFixed(1);
            });
            $scope.changetime = function(t){
                $scope.audio.currentTime = $scope.ctime;
            };
            $scope.changevol = function(t){
                $scope.audio.volume = $scope.vol;
            };

            $scope.ntot = function(secs) {
                var hr  = Math.floor(secs / 3600);
                var min = Math.floor((secs - (hr * 3600))/60);
                var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
                if (min < 10){
                    min = "0" + min;
                }
                if (sec < 10){
                    sec  = "0" + sec;
                }
                return min + ':' + sec;
            }
        }
    };
});

app.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);