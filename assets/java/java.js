$(document).ready(function(){
   $('.carousel').carousel();
});

var searchQuery; //!!!!!! USER INPUT STRING !!!!!
  
$(".btn.waves-effect.waves-light.blue.darken-4").on("click", function(event) {
event.preventDefault();

var character = $("#character-name").val(); 

var publickey = "76cd835d936d952adc72ca7b3647c6e2";

var privatekey = "d988c75463e25f3e311476e6991e26c4a1a36cd5";



var timestamp = new Date().getTime();
var hash = CryptoJS.MD5(timestamp + privatekey + publickey).toString();

// var queryURL = "http://gateway.marvel.com:443/v1/public/characters?name=" + character + "&apikey=76cd835d936d952adc72ca7b3647c6e2&hash=" + hash + "&ts=" + timestamp;
// console.log(queryURL);

// $.ajax({
//   url: queryURL,
//   method: "GET",
// }).done(function(response) {
//  console.log(JSON.stringify(response));
// });

// Public Key
// fc0e2b2bcfc273962ce941db43aa2039

var character = $("#character-name").val();
$(function(){
var marvelAPI = 'https://gateway.marvel.com/v1/public/characters';
$.getJSON( marvelAPI, {
    ts: timestamp,
    apikey: publickey,
    hash: hash,
    name: character
  })
    .done(function( response ) {
      console.log(response);
  });
   
});
//CHRIS' JS

$.ajax ({
  url: "http://api.walmartlabs.com/v1/search/?query=ipad&apiKey=zzjd8dnn2xptv4j8nbj8p9mu&format=json",
  jsonpCallback: "handleresponse",
  dataType: "jsonp"
});


})
function handleresponse(response) {
  console.log(response);
}








