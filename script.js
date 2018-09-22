//NASDAQ function



//CREATING THE URL
var api = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
var stock = "input";
var apiKey = "&types=quote,news,chart&range=1m&last=5";
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
  $("#stockInput").keyup(function (e) {
    if (e.keyCode === 13) {
      var stock = $("#stockInput").val();
        console.log("Stock selected: " + stock);
        console.log("ajax Callling: " + api + stock + apiKey);
        $.ajax({
          type: "GET",
          // url: api + stock + apiKey,
          url: api + stock + apiKey,
          success: function (data) {
            console.log(stock.toUpperCase());
            // let close = data['Time Series (Daily)'] + [fullDate] + ['4. close']; //location of closing price (need to figure out how to automatically get last price)
            let close = data[stock.toUpperCase()]["quote"]["latestPrice"];

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

// $(document).ready(function () {
//   $("#csubmit").click(function () {
//     var coin = $("#coin").val();
//     if (coin != "") {
//       $.ajax({
//         type: "GET",
//         url: cryptoApi + coin + toUSD + capiKey,
//         success: function (data) {
//           let close = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]; //location of current exchange rate
//           // console.log(close);
//           $("#cryptoPriceOutput").html(close); //output to html
//           $("#cryptoPriceOutput").prepend(coin.toUpperCase() + ": $"); //adds crypto name
//         }
//       });
//     }
//   });
// });

$(document).ready(function () {
  $("#coin").keyup(function (e) {
    if(e.keyCode === 13){
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

    }

  });
});


//misc data
function biggestGainers() {
  $.ajax({
    type: "GET",
    url: "https://api.iextrading.com/1.0/stock/market/list/gainers",
    success: function (data) {
      console.log("biggest gainers call successful");
      var gotDataBiggestGainers = data;
      for (i = 0; i < 10; i++) {
        $("#bigGains").append("<p>" + gotDataBiggestGainers[i].symbol + "  $" + gotDataBiggestGainers[i].latestPrice + "</p>");
      }
    }
  });
}

function biggestLosers() {
  $.ajax({
    type: "GET",
    url: "https://api.iextrading.com/1.0/stock/market/list/losers",
    success: function (data) {
      console.log("biggest losers call successful");
      var gotDataBiggestLosers = data;
      for (i = 0; i < gotDataBiggestLosers.length; i++) {
        $("#bigLose").append("<p>" + gotDataBiggestLosers[i].symbol + "  $" + gotDataBiggestLosers[i].latestPrice + "</p>");
      }
    }
  });
}

biggestGainers()
biggestLosers()


// NOTES: DEMO api
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=N06BDYLYWYZK0MA6