shared.factory('souncloud', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){

    var soundcloud = new Object();

    soundcloud.clientId = $rootScope.clientId;

    var apiUrl = "http://api.soundcloud.com/";

    soundcloud.autoComplete = function(text){

        var deferred = $q.defer();

        var text = encodeURIComponent(text);

        var endpoint = 'https://api-v2.soundcloud.com/search/autocomplete?q=' + text + '&results_limit=10&limit=10&offset=0&linked_partitioning=1&client_id=' + soundcloud.clientId;

        $http.get(soundcloud.makeYqlLink(endpoint))
            .then(function(response) {
                deferred.resolve(response.data.query.results.json);
            }, function(response){
                return $q.reject(response);
            });

        return deferred.promise;

    };

    soundcloud.makeYqlLink = function(endpoint){

        var yql = 'http://query.yahooapis.com/v1/public/yql?'
            + 'q=' + encodeURIComponent('select * from json where url=@url')
            + '&url=' + encodeURIComponent(endpoint)
            + '&format=json';

        return yql;

    };

    soundcloud.getTrackStreamLink = function(track){
        return "http://api.soundcloud.com/tracks/"+track.id+"/stream?client_id="+soundcloud.clientId;
    };

    soundcloud.getTrackDetails = function(trackId){

        var deferred = $q.defer();

        var endpoint = apiUrl + "tracks/" + trackId + "?client_id="+ soundcloud.clientId;

        $http.get(soundcloud.makeYqlLink(endpoint))
            .then(function(response) {
                deferred.resolve(response.data.query.results.json);
            }, function(response){
                return $q.reject(response);
            });

        return deferred.promise;

    };

    return soundcloud;

}]);