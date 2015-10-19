shared.controller('HeaderController', ['$rootScope', '$scope', 'souncloud',function($rootScope,$scope,souncloud){

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

}]);