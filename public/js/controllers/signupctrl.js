angular.module('app').controller('SignUpCtrl', function($scope, $http, $window) {
    $scope.message = ""
    $scope.messageType = "danger"
    $scope.signup = function(username, password, conf_password) {
        if (password != conf_password) {
            $scope.messageType = "danger"
            $scope.message = "Password mismatch"
            return;
        }
        $http.post('/api/v1/auth/register', {
            username: username,
            password: password
        }).success(function(data, status) {
            if (status === 201) {
                localStorage.setItem("token", data.token)
                $scope.messageType = "success"
                $scope.message = "Sign Up Succesful"
                $window.location.href = '/bucketlist'
            }
        }).error(function(err) {
            if (err) {
                $scope.messageType = "danger"
                $scope.message = (err.message || err.error) || "An error occured. Please try again"
            }
        })
    }
});
