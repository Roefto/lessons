"use strict";

var products = {
    init: function () {
        this.popupButtonsInit();
        this.getProducts();
    },

    popupButtonsInit: function () {
        var self = this;
        $('body').on('click', '.js-popup-button', function () {
            if($(this).data('type') === 'resend') self.getProducts();
            $('.js-error-popup').remove();
        });
    },

    getProducts: function () {
        $.ajax({
            url: './products.json',
            dataType: 'json',
            beforeSend: function() {$.fancybox.showLoading()}
        })
            .done(this.parseProducts)
            .fail(this.showErrorMessage)
            .always($.fancybox.hideLoading);
    },
    
    parseProducts: function (data) {
        var $categories = $('.js-category'),
            template = _.template($('#categoryProductsTemplate').html()),
            products = [],
            categoryTitles = {
                'sale': 'Распродажа',
                'promo': 'Промо-акция',
                'recommended': 'Промо-акция'
            };

        data.forEach(function(item){
            if(!products[item.type]) products[item.type] = [];
            products[item.type].push({
                'name': item.name,
                'pic': item.pic,
                'price': item.price
            });
        });

        $categories.each(function () {
            var $category = this,
                categoryId = this.id,
                categoryTitle = categoryTitles[categoryId];

            if(products[categoryId]){
                $category.innerHTML = template({
                    title: categoryTitle,
                    list: products[categoryId]
                });
            }
        });
    },

    showErrorMessage: function (xhr, status, errorThrown) {
        var messagePopup = _.template($('#errorMessageTemplate').html());

        $(messagePopup()).appendTo('body').addClass('_showed');

        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
    }
};

products.init();