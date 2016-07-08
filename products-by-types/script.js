var products = {
    init: function () {
        var $this = this;

        $this.getProducts();

        $('body').on('click', '.js-popup-button', function () {
            if($(this).data('type') === 'resend') $this.getProducts();
            $('.js-error-popup').remove();
        });
    },

    getProducts: function () {
        var productsPromise = $.getJSON('./products.json');

        $.fancybox.showLoading();

        this.sleep().done(function () {
            productsPromise
                .done(this.parseProducts)
                .fail(this.showErrorMessage)
                .always($.fancybox.hideLoading);
        }.bind(this));
    },

    parseProducts: function (data) {
        var template = _.template($('.js-products-template').html()),
            categories = $('.js-category').toArray(),
            products = [];

        data.forEach(function(item){
            if(!products[item.type]) products[item.type] = [];
            products[item.type].push({
                'name': item.name,
                'pic': item.pic,
                'price': item.price
            });
        });

        categories.forEach(function (item) {
            var categoryId = item.id;
                categoryTitle = null;
            
            switch (categoryId) {
                case 'sale':
                    categoryTitle = 'Распродажа';
                    break;
                case 'promo':
                    categoryTitle = 'Промо-акция';
                    break;
                case 'recommended':
                    categoryTitle = 'Рекомендуемые товары';
                    break;
            }

            if(products[categoryId]){
                item.innerHTML = template({
                    title: categoryTitle,
                    list: products[categoryId]
                });
            }
        });
    },

    showErrorMessage: function (xhr, status, errorThrown) {
        var messagePopup = _.template($('.js-error-message-template').html());

        $(messagePopup()).appendTo('body').addClass('_showed');

        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
    },

    sleep: function (time) {
        var promise = new $.Deferred();

        setTimeout(function () {
            promise.resolve();
        }, time || 1000);

        return promise;
    }
};

products.init();