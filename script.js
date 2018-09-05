//NASDAQ function



//CREATING THE URL
var api = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
var stock = "input";
var apiKey = ",fb&types=quote,news,chart&range=1m&last=5";
// var apiKey = "&apikey=N06BDYLYWYZK0MA6"; //PRIVATE KEY


urlKey = "https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5";

// FETCHING CURRENT DATE
// -- still some bugs
var date = new Date();

var month = date.getMonth()
if (month < 10) {
  month = month + 1;
  month = "0" + month;
}


var day = date.getDate();
if (day < 10) {
  day = "0" + day;
}

var year = date.getFullYear();

var fullDate = year + "-" + month + "-" + day;
var objDate = "[" + '"' + fullDate + '"' + "]";


// calling stock price function
$(document).ready(function () {
  $("#submit").click(function () {
    var stock = $("#stock").val();
    if (stock != "") {
      console.log("Stock selected: " + stock);
      console.log("ajax Callling: " + api + stock + apiKey);
      $.ajax({
        type: "GET",
        // url: api + stock + apiKey,
        url: api + stock + apiKey,
        success: function (data) {
          console.log(stock.toUpperCase());
          // let close = data['Time Series (Daily)'] + [fullDate] + ['4. close']; //location of closing price (need to figure out how to automatically get last price)
          let close = data[stock.toUpperCase()]["quote"]["close"];

          console.log(close);
          // console.log("Today's date is: " + fullDate);

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

var capiKey = "&apikey=N06BDYLYWYZK0MA6"; //PRIVATE KEY

$(document).ready(function () {
  $("#csubmit").click(function () {
    var coin = $("#coin").val();
    if (coin != "") {
      $.ajax({
        type: "GET",
        url: cryptoApi + coin + toUSD + capiKey,
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

// Watchlist function
// an array of objects containing data from coins or stocks that will be displayed



$(document).ready(function () {
  var watchlist = ["DBX", "SNDX", "MSFT", "TSLA"];
  for (i = 0; i < watchlist.length; i++) {
    console.log("ajax Callling: " + api + watchlist[i] + apiKey);
    $.ajax({
      type: "GET",
      // url: api + stock + apiKey,
      url: api + watchlist[i] + apiKey,
      success: function (data) {
        console.log("connect OK");
        console.log("i = : " + i);
        $("#watching").append("<li>" + watchlist[i] + "</li>");
        $("#priceWatch").append("<li>" + data[watchlist[i]]["quote"]["close"] + "</li>");
      }
    })
  }
});







// NOTES: DEMO api
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=N06BDYLYWYZK0MA6