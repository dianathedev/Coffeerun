(function(window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }

    Truck.prototype.createOrder = function(order) {
        console.log('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for ' + customerId);
        this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function() {
        var customerIdArray = Object.keys(this.db.getAll());

        console.log('Truck # ' + this.truckId + 'has pending orders: ');
        customerIdArray.forEach(function(id) {
            console.log(this.db.get(id));
        }.bind(this));
    };

    //Since printOrders was not returning the values to be able to compare
    //I added this part of code that returns the items
    Truck.prototype.testGetAll = function() {
        var ordersArray = Object(this.db.getAll());
        return ordersArray;

    };

    App.Truck = Truck;
    window.App = App;
})(window);
