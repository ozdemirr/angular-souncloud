var index = angular.module('index', []);

    index.controller('IndexController', ['$rootScope', '$scope', 'souncloud',function($rootScope,$scope, souncloud){

        $scope.search = function(){

                souncloud.autoComplete($scope.searchText)
                    .then(function(data){

                        $scope.autoCompleteResult = data;

                        $rootScope.tracks = data.results;

                    })

            };

        $scope.changeSearchText = function(text){
            $scope.searchText = text;
            $scope.search();
        };


        $scope.playTrack = function(track){

            $rootScope.track = new Object();

            souncloud.getTrackDetails(track.id)
                .then(function(data){
                    $rootScope.track.waveform = data.waveform_url;
                });

            $rootScope.track.url = souncloud.getTrackStreamLink(track);
        };

    }]);