angular.module('app').controller('BucketlistCtrl', function($scope, $http, $window) {
    $http.get('/api/v1/bucketlist', {
        headers: {
            'Authorization': localStorage.getItem('token') || ''
        }
    }).success(function(data) {
        console.log(data.results);
        $scope.bucketlists = data.results
    }).error(function(err) {
        console.log(err);
        $scope.bucketlists = []
    })

});
