$(".btn.waves-effect.waves-light.blue.darken-4").on("click", function (event) {
    event.preventDefault();

    $(".card-image").empty();
    $(".card-content").empty();
    $(".card-action").empty();
    $(".header").empty();

    var character = $("#character-name").val();

    var characterid;
    var charactername;
    var charImg;
    var comicImg;
    var p;
    var title;
    var description;

    var publickey = "76cd835d936d952adc72ca7b3647c6e2";

    var privatekey = "d988c75463e25f3e311476e6991e26c4a1a36cd5";

    var limit = "5";

    var format = "comic";

    var timestamp = new Date().getTime();
    var hash = CryptoJS.MD5(timestamp + privatekey + publickey).toString();

    var character = $("#character-name").val();
    $(function () {
        var marvelAPI = 'https://gateway.marvel.com/v1/public/characters';
        $.getJSON(marvelAPI, {
            ts: timestamp,
            apikey: publickey,
            hash: hash,
            name: character,
            limit: limit
        })
            .done(function (response) {
                console.log(response);
                var results = response.data.results;

                for (var i = 0; i < results.length; i++) {

                    var imgDiv = $("<div class='item'>");

                    description = results[i].description;
                    characterid = results[i].id;
                    charactername = results[i].name;
                    
                    var imgmod = "/portrait_uncanny.jpg";
                    var spanclass = "card-title";

                    p = $("<p>").text("Description: " + description);

                    var charImg = $("<img>");
                    charImg.attr("src", results[i].thumbnail.path + imgmod);

                    var charSpan = $("<span class='card-title'>" + charactername + "</span>");
                    console.log(charSpan);

                    $(".card-image").append(charImg);
                    $(".card-content").append(charSpan, description);

                }

                $(function () {
                    var marvelAPI2 = 'https://gateway.marvel.com/v1/public/comics';
                    $.getJSON(marvelAPI2, {
                        ts: timestamp,
                        apikey: publickey,
                        hash: hash,
                        characters: characterid,
                        limit: limit,
                        format: format
                    })
                        .done(function (response) {
                            console.log(response);
                            
                            var results = response.data.results;
                                
                            for (var i = 0; i < results.length; i++) {
                                title = results[i].title;
                                console.log(title);

                                var imgurl = results[i].urls[0].url;
                         
                                var comiccover = "/portrait_medium.jpg";

                                comicImg = $("<img>");
                                comicImg.attr({ src: results[i].thumbnail.path + comiccover, url: imgurl, class: "searchimg" }).css("margin-right", "5px");

                                $(".card-action").append(comicImg);



                            }

                        });

                });

            });
           
    });
    //CHRIS' JS
    $(".carousel").empty();
    $(".carousel").removeClass("initialized");



    var sQuery = $("#character-name").val();


 $.ajax ({
  url: "https://api.walmartlabs.com/v1/search/?query="+sQuery+"&apiKey=zzjd8dnn2xptv4j8nbj8p9mu&format=json",
  jsonpCallback: "handleresponse",
  dataType: "jsonp"
});
 
});

function handleresponse(response) {
  for(j=0; j < 10; j++) {
    var prodName = response.items[j].name;
    var prodImg = response.items[j].largeImage;
    var prodPrice = response.items[j].salePrice;
    var prodUrl = response.items[j].productUrl;
    $(".carousel").append("<div class='carousel-item product center-align' url='"+prodUrl+"'>"+prodName+"<img src='"+prodImg+"' alt='ERROR'>Sale Price: $"+prodPrice+"</div>");
  }
  $('.carousel').carousel();
}
//Comic Clicks
$(document).on("click", ".searchimg", function () {
    console.log(this);
    console.log($(this).attr("url"));
    window.open($(this).attr("url"));
});

//Product Clicks
$(document).on("click", ".product", function () {
    window.open($(this).attr("url"));

})
