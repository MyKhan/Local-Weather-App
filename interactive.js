var openWeatherId = "FreeCodeCamp";
var openWeatherkey = "4cf52d17b16d6af13d62bd522f7f5039";
var element = document.getElementById("weather-icon");
var entireBox = document.getElementById("div_entire-thing");
var code;

if (window.innerHeight>420) {
    var marginTop = (window.innerHeight-420)/2;
    entireBox.style.marginTop = marginTop + "px";
    }

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(
  function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    updateWeatherConditions(lat, long);
});
} else {
  lat = 35.689;
  long = 139.6917;
  updateWeatherConditions(lat, long);
}


function updateWeatherConditions(lat, long) {
     url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(" + lat + "%2C" + long+")%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  $.ajax({
    url: url,
    async: false,
    success: function(data){
      $("#h2_temperature-update").text(Math.round((data.query.results.channel.item.condition.temp - 32) / 1.8) + "\xB0C");
      $("#div_place-update").text(data.query.results.channel.location.city + ", " + data.query.results.channel.location.country);
      $("#div_sky-update").text(data.query.results.channel.item.condition.text);
      $("#div_wind-update").text(data.query.results.channel.wind.speed + " mph");
      
      var height = $("#div_place-update").outerHeight();
      $("#div_place-update").outerHeight(height);
      $("#div_sky-update").outerHeight(height);
      $("#div_wind-update").outerHeight(height);
      

      code = data.query.results.channel.item.condition.code;
      if ((code>=0 && code<=12) || (code>=37 && code<=40) || code == 35 || (code>=45 && code<=47)){
        element.classList.add("fas", "fa-tint", "for-rain");
      } else if((code>=13 && code<=16) || (code>=41 && code<=43)) {
        element.classList.add("fas", "fa-snowflake", "for-snow");    
      } else if ((code>=26 && code<=30) || code==44) {
        element.classList.add("fas", "fa-cloud", "for-clouds");
      } else if(code==32 || code==34) {
        element.classList.add("fas", "fa-sun", "for-sun"); 
      } else if (code==31 || code==33) {
        element.classList.add("fas", "fa-moon", "for-moon");
      } else if(code==36) {
        element.classList.add("fas", "fa-fire", "for-hot");
      } else if (code==3200) {
        element.classList.add("fas", "fa-unavailable");
      } else {
        element.classList.add("fas", "fa-eye-slash");
      }
    },
    dataType: "jsonp"
  });
 
}