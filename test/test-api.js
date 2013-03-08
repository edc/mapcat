var mapcat = require('../lib');

exports['test that the api is properly exposed in the top level'] = function (assert) {
assert.equal(typeof mapcat.cat, "function");
};
