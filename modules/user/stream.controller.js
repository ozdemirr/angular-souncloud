var user = angular.module('user', []);

user.controller('StreamController', ['$scope', 'souncloud',function($scope,souncloud){

    souncloud.getActivities()
        .then(function(data){

            $scope.activities = data.collection;

            $scope.next_href = data.next_href;

        });

    $scope.loadMore = function(){

        souncloud.loadMore($scope.next_href.split("&")[1])
            .then(function(data){

                $scope.activities = $scope.activities.concat(data.collection);
                //
                $scope.next_href = data.next_href;

            });

    };

}]);