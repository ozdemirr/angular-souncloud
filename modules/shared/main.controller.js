shared.controller('MainController', ['$rootScope', '$scope', 'souncloud','$cookies','$state',function($rootScope,$scope,souncloud,$cookies,$state){

    $scope.playTrack = function(track){

        $rootScope.track = new Object();

        souncloud.getTrackDetails(track.id)
            .then(function(data){
                $rootScope.track.waveform = data.waveform_url;
            });

        $rootScope.track.url = souncloud.getTrackStreamLink(track);
    };

    $scope.logOut = function(){

        $cookies.remove("user");

        delete $rootScope.user;

        souncloud.flushUser();

        $state.go("index");

    };

}]);