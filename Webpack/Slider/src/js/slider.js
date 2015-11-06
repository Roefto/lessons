$(document).ready(function(){
    require('../slider/slick.js');
    require('../slider/slick.css');
    require('../slider/slick-theme.css');

    var slider = $('#slider'),
        numberOfSlides = 5,
        promises = [],
        images = [];

    for(var i = 1; i <= numberOfSlides; i++) {
        var img = new Image();
        img.src = require("../images/" + i + ".jpg");
        images.push(img);
        promises.push(
            new Promise(function(resolve){
                img.onload = function(){resolve()};
            })
        )
    }

    Promise.all(promises).then(function(){ // $.when.apply(null, promises).done(function(){
        slider.append(images);
        slider.slick({
            dots : true
        });
    });

    /*
    var cache = {};

    function callback(src) {
        delete cache[src];
        for(var key in cache) return false;

        slider.append(images);
        slider.slick({
            dots : true
        });
    }

    for(var i = 1; i <= numberOfSlides; i++){
        var src = require('../images/' + i + '.jpg');
        var img = new Image();
        img.src = src;
        cache[src] = true;
        img.onload = callback.bind(null, src);
        images.push(img);
    }
    */
});