var config = {
    apiKey: "AIzaSyBs-OKSK3k1H8ZfsAQqXw1mdEMUESF2i7Y",
    authDomain: "marvel-aggregator.firebaseapp.com",
    databaseURL: "https://marvel-aggregator.firebaseio.com",
    projectId: "marvel-aggregator",
    storageBucket: "marvel-aggregator.appspot.com",
    messagingSenderId: "429910546717"
  };
  firebase.initializeApp(config);

  var database = firebase.database();



var autoArray= [];


$(document).ready( function(){
    $(".card").hide();
    $(".btn.waves-effect.waves-light.blue.darken-4").addClass("disabled");
 

});

$(document).on("keyup", function (){
    if ($(".character-name").val() != "") {
         $(".btn.waves-effect.waves-light.blue.darken-4").removeClass("disabled");
     }
     else {
         $(".btn.waves-effect.waves-light.blue.darken-4").addClass("disabled");
     }
 });

var clickCount = 0;
var character = $(".character-name").val();

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

$(".btn.waves-effect.waves-light.blue.darken-4").on("click", function (event) {
    event.preventDefault();

    if (clickCount != 0) {
        $(".card").removeClass("animated bounceInLeft");
        $(".card").addClass("animated bounceOutRight");
      

      setTimeout( function(){
        $(".card").removeClass("animated bounceOutRight");
        $(".card").addClass("animated bounceInLeft");
      }, 750);  
    }
    else {
        $(".card").show();
        $(".card").addClass("animated bounceInLeft"); 
        clickCount++
    }

    character = $(".character-name").val().trim();

    database.ref().push({
        name: character
    });

    $(function  () {
        var marvelAPI = 'https://gateway.marvel.com/v1/public/characters';
        $.getJSON(marvelAPI, {
            ts: timestamp,
            apikey: publickey,
            hash: hash,
            name: character,
            limit: limit
        })
            .done(function charCall (response) {
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
                    console.log(charSpan );
                    setTimeout(function(){
                        $("#marvImg").append(charImg);
                        $("#marvInfo").append(charSpan, description);
                    }, 500);
                }
                setTimeout (function(){
                 comicCall();
                }, 500);

            });
    });
    //CHRIS' JS
    setTimeout(function(){
        fetchingmovies(character);
     
    }, 600);
       
    $(".carousel").empty();
    $(".carousel").removeClass("initialized");

    $.ajax ({
    url: "https://api.walmartlabs.com/v1/search/?query="+character+"&apiKey=zzjd8dnn2xptv4j8nbj8p9mu&format=json",
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
function  comicCall() {
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
                        
                        
                        var results = response.data.results;
                        for (var i = 0; i < results.length; i++) {
                            title = results[i].title;
                  

                            var imgurl = results[i].urls[0].url;
                        
                            var comiccover = "/portrait_medium.jpg";

                            comicImg = $("<img>");
                            comicImg.attr({ src: results[i].thumbnail.path + comiccover, url: imgurl, class: "searchimg" }).css("margin-right", "5px");
                             $("#marvComs").append(comicImg);
                        }
                    });
}
     

function fetchingmovies(title) {
   
    $(".card-image").empty();
    $(".card-content").empty();
    $(".card-action").empty();
    $(".card-title").empty();
    $(".header").empty();
    var secondqueryURL;
    var j = 0;
    var queryURL = "https://www.omdbapi.com/?s=" + title + "&type = movie&y=&plot=short&apikey=40e9cece";
    var responseReceived;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response);
        responseReceived = response;
        for (var i = 0; i < 3; i++) {
            text = response.Search[i].imdbID
            secondqueryURL = "https://www.omdbapi.com/?i=" + text + "&type = movie&y=&plot=short&apikey=40e9cece";
            $('#mov' + i).append(response.Search[i].Title);
            $("#img" + i).append('<img class = "card-image" src="' + response.Search[i].Poster + '">');
            callSecond();
           
        }
        function callSecond() {
            $.ajax({
                url: secondqueryURL,
                dataType: 'json'
            }).done(function (data) {
                 console.log(data);
                 var movPlot = data.Plot;
                $('#plot'+ j).append("<p>" + movPlot + "</p>");
                console.log(j);
                
                j= j+1;
            });
        
        }
    })
}

database.ref().on("child_added", function(snapshot) {
     heroName = snapshot.val().name; 
    autoArray.push(heroName);
});  
