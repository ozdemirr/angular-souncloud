user.controller('LikesController', ['$scope', 'souncloud', function($scope,souncloud){

    souncloud.getMylikes()
        .then(function(data){
            $scope.likes = data.collection;
            $scope.next_href = data.next_href;
        });

    $scope.loadMore = function(){

        souncloud.getMylikes($scope.next_href.split("&")[1])
            .then(function(data){

                $scope.likes = $scope.likes.concat(data.collection);

                $scope.next_href = data.next_href;

            });

    };

}]);