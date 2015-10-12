    var cashe = {};
    $(".menu a").click(function(event) {
        event.preventDefault();
        var href = $(this).attr("href");
        var data = $(this).attr("data-social");
        getContent(href, data);
    });

    function getContent(name, dataS){
        if(cashe[name]){
            $("#content").html(cashe[name])
        } else {
            if(!dataS){
                $.ajax(name).then(function(text){
                    cashe[name] = text;
                    $("#content").html(text);
                })
            } else {
                $.when(
                    $.ajax(name),
                    $.ajax(dataS)
                ).then(function(text, social){
                        cashe[name] = text[0] + parseSocialJson(social[0]);
                        $("#content").html(cashe[name]);
                    })
            }
        }
    }

    function parseSocialJson(arr){
        var social = "";
        for(var key in arr){
            social += "<li>" + "<a href='" + arr[key].url + "'>"
                + arr[key].title + "</a></li>"
        }
        social = "<ul>" + social + "</ul>";
        return social;
    }