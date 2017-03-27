(function(window) {
    'use strict';
    //code will go here
    var App = window.App || {};

    function Achievements() {
        this.data = {};
    }

    Achievements.prototype.add = function(key, val) {
        this.data[key] = val;
    };

    Achievements.prototype.get = function(key) {
        return this.data[key];
    };

    Achievements.prototype.getAll = function() {
        return this.data;
    };

    Achievements.prototype.remove = function(key) {
        delete this.data[key];
    };

    App.Achievements = Achievements;
    window.App = App;
})(window);
