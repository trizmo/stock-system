var arr = ["quote1", "quote two", "third quote", "a 4th quote", "number 5", "sixth", "lastly number 7 quote"];
var nameArr = ["testone"];

// var rand300 =  [Math.floor((Math.random() * 300) + 1)]
// var rand650 =  [Math.floor((Math.random() * 650) + 1)]

$("#demo").click(function () {
  // alert("jquery is working");
  $("#quote").html("<p>" + arr[Math.floor((Math.random() * 7) + 0)] + "</p>");

});


var api = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
var stock = "input";
var apiKey = "&apikey=N06BDYLYWYZK0MA6";




$(document).ready(function () {
  $("#date").text("2018-08-24");


  $("#submit").click(function () {
    var stock = $("#stock").val();
    if (stock != "") {
      $.ajax({
        type: "GET",
        url: api + stock + apiKey,
        success: function (data) {
          let close = data["Time Series (Daily)"]["2018-08-24"]["4. close"];
          $("#check").html(close);
          $("#check").prepend(stock.toUpperCase() + ": $");
        }
      });
    }
  });




});




// http://api.openweathermap.org/data/2.5/weather?q=whittier,ca&APPID=a87a003c40bfefe9d5fa286f9e0f5917
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo