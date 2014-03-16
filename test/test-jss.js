module('jss', {
    teardown: function() {
        jss.remove();
    }
});

test('get retrieves styles from the JSS stylesheet', function() {
    var result = jss.get();
    equal(Object.keys(result).length, 0);

    jss.set('#jss-test', { 'color': 'red', 'font-size': '20px' });
    result = jss.get();
    equal(Object.keys(result).length, 1);
    equal(Object.keys(result['#jss-test']).length, 2);

    jss.set('#jss-test .child-element', { 'color': 'blue' });
    result = jss.get();
    equal(Object.keys(result).length, 2);
    equal(Object.keys(result['#jss-test']).length, 2);
    equal(result['#jss-test']['color'], 'red');
    equal(result['#jss-test']['font-size'], '20px');
    equal(Object.keys(result['#jss-test .child-element']).length, 1);
    equal(result['#jss-test .child-element']['color'], 'blue');
});

test('calling get with a selector retrieves styles from the JSS stylesheet for that selector', function() {
    var result = jss.get('#jss-test');
    equal(Object.keys(result).length, 0);

    jss.set('#jss-test', { 'color': 'red', 'font-size': '20px' });
    result = jss.get('#jss-test');
    equal(Object.keys(result).length, 2);
    equal(result['color'], 'red');
    equal(result['font-size'], '20px');
});

test('getAll also retrieves styles not part of the JSS stylesheet', function() {
    var result = jss.getAll('#jss-test');
    equal(Object.keys(result).length, 1);
    equal(result['display'], 'none');

    jss.set('#jss-test', { 'color': 'red', 'font-size': '20px' });
    result = jss.getAll('#jss-test');
    equal(Object.keys(result).length, 3);
    equal(result['color'], 'red');
    equal(result['font-size'], '20px');
    equal(result['display'], 'none');
});

test('remove only removes styles added to the JSS stylesheet', function() {
    jss.set('#jss-test', { 'color': 'red', 'font-size': '20px' });
    var result = jss.getAll('#jss-test');
    equal(Object.keys(result).length, 3);

    jss.remove();
    result = jss.getAll('#jss-test');
    equal(Object.keys(result).length, 1);
    equal(result['display'], 'none');
});

test('calling remove with a selector only removes styles added to the JSS stylesheet', function() {
    jss.set('#jss-test', { 'color': 'red', 'font-size': '20px' });
    var result = jss.getAll('#jss-test');
    equal(Object.keys(result).length, 3);

    jss.remove('#jss-test');
    result = jss.getAll('#jss-test');
    equal(Object.keys(result).length, 1);
    equal(result['display'], 'none');
});

test('calling remove with a selector only removes styles for that selector', function() {
    jss.set('#jss-test', { 'color': 'red' });
    jss.set('#alternative-element', { 'color': 'blue' });
    equal(jss.get('#jss-test')['color'], 'red');
    equal(jss.get('#alternative-element')['color'], 'blue');

    jss.remove('#jss-test');
    equal(Object.keys(jss.get('#jss-test')).length, 0);
    equal(jss.get('#alternative-element')['color'], 'blue');
});