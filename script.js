//CREATING THE URL
var api = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
var stock = "input";
var apiKey = "&apikey=N06BDYLYWYZK0MA6"; //PRIVATE KEY


$(document).ready(function () {
  $("#date").text("2018-08-24");


  $("#submit").click(function () {
    var stock = $("#stock").val();
    if (stock != "") {
      $.ajax({
        type: "GET",
        url: api + stock + apiKey,
        success: function (data) {
          let close = data["Time Series (Daily)"]["2018-08-24"]["4. close"]; //location of closing price (need to figure out how to automatically get last price)
          console.log();
          $("#check").html(close); //output to html
          $("#check").prepend(stock.toUpperCase() + ": $"); //adds stock name
        }
      });
    }
  });




});






// DEMO api
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo