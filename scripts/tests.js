QUnit.test('hello test', function(assert) {
    assert.ok(1 == '1', 'Passed!');
});

var App = window.App || {};

QUnit.test('datastore.js', function(assert) {
    var ds = new App.DataStore();
  
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    var result = ds.getAll();
    assert.deepEqual(result, {
        'm@bond.com': 'tea',
        'james@bond.com': 'eshpressho'
    }, 'add function = Passed!');

    ds.remove('james@bond.com');
    result = ds.getAll();
    assert.deepEqual(result, {
        'm@bond.com': 'tea'
    }, 'remove function = Passed!');

    result = ds.get('m@bond.com');
    assert.equal(result, 'tea', 'get function = Passed!');

    result = ds.get('james@bond.com');
    assert.equal(result, undefined, 'undefined test = Passed!');

});

QUnit.test('truck.js', function(assert) {
    var myTruck = new App.Truck('007', new App.DataStore());
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });

    assert.deepEqual(myTruck.testGetAll(), {
        'm@bond.com': {
            'coffee': 'earl grey',
            emailAddress: 'm@bond.com'
        }
    }, 'creating an order');

});
