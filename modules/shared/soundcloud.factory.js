shared.factory('souncloud', ['$rootScope', '$http', '$q', 'soundcloudConfig', function($rootScope, $http, $q,soundcloudConfig){

    var soundcloud = new Object();

    soundcloud.clientId = soundcloudConfig.clientId;

    soundcloud.getAccess = function(){
        if(angular.isDefined(soundcloud.oauth_token)){
            return "oauth_token="+soundcloud.oauth_token;
        }else{
            return "client_id="+soundcloud.clientId;
        }
    };

    soundcloud.flushUser = function(){

        delete soundcloud.oauth_token;

        delete soundcloud.userId;

    };

    var apiUrl = "http://api.soundcloud.com/";

    soundcloud.autoComplete = function(text){

        var deferred = $q.defer();

        var text = encodeURIComponent(text);

        var endpoint = 'https://api-v2.soundcloud.com/search/autocomplete?q=' + text + '&results_limit=10&limit=10&offset=0&linked_partitioning=1&' + soundcloud.getAccess();

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
        return "http://api.soundcloud.com/tracks/"+track.id+"/stream?" + soundcloud.getAccess();
    };

    soundcloud.getTrackDetails = function(trackId){

        var deferred = $q.defer();

        var endpoint = apiUrl + "tracks/" + trackId + "?" + soundcloud.getAccess();

        $http.get(soundcloud.makeYqlLink(endpoint))
            .then(function(response) {
                deferred.resolve(response.data.query.results.json);
            }, function(response){
                return $q.reject(response);
            });

        return deferred.promise;

    };

    soundcloud.me = function(){
        var deferred = $q.defer();

        var endpoint = apiUrl + "me?" + soundcloud.getAccess();

        $http.get(soundcloud.makeYqlLink(endpoint))
            .then(function(response) {
                deferred.resolve(response.data.query.results.json);
            }, function(response){
                return $q.reject(response);
            });

        return deferred.promise;
    };

    soundcloud.getActivities = function(){
        var deferred = $q.defer();

        var endpoint = apiUrl + "me/activities?" + soundcloud.getAccess();

        $http.get(soundcloud.makeYqlLink(endpoint))
            .then(function(response) {
                deferred.resolve(response.data.query.results.json);
            }, function(response){
                return $q.reject(response);
            });

        return deferred.promise;
    };

    soundcloud.loadMore = function(cursor){
        var deferred = $q.defer();

        var endpoint = apiUrl + "me/activities?limit=10&" + cursor + "&" + soundcloud.getAccess();

        $http.get(endpoint)
            .then(function(response) {
                deferred.resolve(response.data);
            }, function(response){
                return $q.reject(response);
            });

        return deferred.promise;
    };

    soundcloud.getMylikes = function(cursor){
        if(!cursor) {
            cursor="";
        }else{
            cursor = "&" + cursor;
        }

        var deferred = $q.defer();

        var endpoint = "https://api-v2.soundcloud.com/users/"+soundcloud.userId+"/track_likes?limit=10" + cursor + "&" + soundcloud.getAccess();

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

shared.provider('soundcloudConfig', function() {
    var self = this;
    this.$get = function() {
        return {
            clientId: self.clientId
        };
    };
});