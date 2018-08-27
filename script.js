//NASDAQ function

//CREATING THE URL
var api = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
var stock = "input";
var apiKey = "&apikey=N06BDYLYWYZK0MA6"; //PRIVATE KEY

$(document).ready(function () {
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

// crypto function

// creating the URL
var cryptoApi = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=";
var coin = "input";
var toUSD = "&to_currency=USD";
var apiKey = "&apikey=N06BDYLYWYZK0MA6"; //PRIVATE KEY

$(document).ready(function () {
  $("#csubmit").click(function () {
    var coin = $("#coin").val();
    if (coin != "") {
      $.ajax({
        type: "GET",
        url: cryptoApi + coin + toUSD + apiKey,
        success: function (data) {
          let close = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]; //location of current exchange rate
          // console.log(close);
          $("#cryptoPriceOutput").html(close); //output to html
          $("#cryptoPriceOutput").prepend(coin.toUpperCase() + ": $"); //adds crypto name
        }
      });
    }
  });
});








// NOTES: DEMO api
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo