angular.module('app').controller('LoginCtrl', function($scope, $http, $window) {
    $scope.message = ""
    $scope.messageType = "danger"
    $scope.login = function(username, password) {
        $http.post('/api/v1/auth/login', {
            username: username,
            password: password
        }).success(function(data, status) {
            if (status === 200) {
                localStorage.setItem("token", data.token)
                localStorage.setItem("username", username)
                $scope.messageType = "success"
                $scope.message = "Login Succesful"
                $window.location.href = '/bucketlist'
            }
        }).error(function(err) {
            if (err) {
                $scope.messageType = "danger"
                $scope.message = (err.message || err.error) || "Incorrect username or password"
            }
        })
    }
});
