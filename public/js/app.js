var app = angular.module('app', []);
eventListeners = {
    init: function() {
        // Ensure all flash messages fadeout after three seconds
        setTimeout(function() {
            $('#flash-message').fadeOut();
        }, 31000);
    }
};

$(document).ready(function() {
    eventListeners.init();
});
