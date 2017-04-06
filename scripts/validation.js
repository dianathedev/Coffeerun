(function(window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function(email) {
            return /.@bignerdranch\.com$/.test(email);
        },

        isValidEmail: function(email, remoteDS) {
            App.validEmail = true;
            return remoteDS.get(email, function(serverResponse) {
                if (serverResponse === null) {
                    App.validEmail = true;
                } else {
                    if (serverResponse.emailAddress === email) {
                        App.validEmail = false;
                    }
                }
            });
        },

        isDecaf: function(coffee, strength) {
            if (/decaf/.test(coffee) && strength > 20) {

                return false;
            } else {

                return true;
            }
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);
