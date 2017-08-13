$(document).ready(function () {
    $('.carousel').carousel();
});

var searchQuery; //!!!!!! USER INPUT STRING !!!!!

$(".btn.waves-effect.waves-light.blue.darken-4").on("click", function (event) {
    event.preventDefault();

    $("#card-content").empty();

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
                console.log(response.data.results);
                var results = response.data.results;

                for (var i = 0; i < results.length; i++) {

                    var imgDiv = $("<div class='item'>");

                    description = results[i].description;
                    characterid = results[i].id;
                    charactername = results[i].name;
                    
                   // console.log(charactername);
                   // console.log(description);
                   // console.log(characterid);
                    
                    var imgmod = "/portrait_incredible.jpg"

                    p = $("<p>").text("Description: " + description);

                    var charImg = $("<img>");
                    charImg.attr("src", results[i].thumbnail.path + imgmod);

                    //imgDiv.prepend(p);
                    //imgDiv.prepend(charImg);

                    //$("#test").prepend(imgDiv);

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
                            console.log(response.data.results);
                            console.log(characterid);
                            console.log(charactername);
                            console.log(description);
                            var results = response.data.results;
                            console.log(response.data.results[0].urls[0].url);

                            for (var i = 0; i < results.length; i++) {

                                title = results[i].title;
                                console.log(title);
                                var imgurl = response.data.results[i].urls[0].url;
                                console.log(imgurl);
                                var comiccover = "/portrait_xlarge.jpg";
                                //var comicimgDiv = $("<div class='item'>");

                                comicImg = $("<img>");
                                comicImg.attr({ src: results[i].thumbnail.path + comiccover, url: imgurl, class: "searchimg" });
                                console.log(comicImg);
                                //comicimgDiv.prepend(comicImg);
                                //comicimgDiv.prepend(title);

                            }

                             $("#card-content").append("<div class='col s12 m7'>" + "<h2 class='header'>" + charactername + "</h2>" + "<div class='card horizontal'>" + "<div class='card-image'>" + charImg + "</div>" + "<div class='card-stacked'>" + "<div class='card-content'>" + p + "</div>" + "<div class='card-action'>" + comicImg + title + "</div>" + "</div>" + "</div>" + "</div>");

                        });

                });

            });
           
    });
    //CHRIS' JS

    $.ajax({
        url: "https://api.walmartlabs.com/v1/search/?query=ipad&apiKey=zzjd8dnn2xptv4j8nbj8p9mu&format=json",
        jsonpCallback: "handleresponse",
        dataType: "jsonp"
    });
});
//walmart function
function handleresponse(response) {
    console.log(response);
}

//Comic Clicks
$(document).on("click", ".searchimg", function () {
    console.log(this);
    console.log($(this).attr("url"));
    window.open($(this).attr("url"));
});







