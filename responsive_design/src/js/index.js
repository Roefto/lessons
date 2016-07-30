var homePage = {
    init: function () {
        this.initCache();
        this.initToggleMenu();
    },
    initCache: function () {
        this.toggleMenuButton = $('.js-menu-toggle');
        this.substrate        = $('.js-substrate');
    },
    initToggleMenu: function () {
        this.toggleMenuButton.on('click', function () {
            $('body').toggleClass('_menu-active')
        });
        this.substrate.on('click', function () {
            $('body').removeClass('_menu-active')
        });
        $(window).resize(function(){
            if(this.toggleMenuButton.is(':hidden')) $('body').removeClass('_menu-active')
        }.bind(this));
    }
};

homePage.init();