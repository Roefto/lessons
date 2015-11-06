require('../css/style.css');
require('file?name=index.html!../index.html');

require.ensure([], function(require) {
    require('../js/slider.js');
});