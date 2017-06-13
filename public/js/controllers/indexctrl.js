app.controller('IndexCtrl', ['$scope', function($scope) {
    $scope.username = localStorage.getItem("username") || ""
}]);
