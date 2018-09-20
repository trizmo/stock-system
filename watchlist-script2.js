$(document).ready(function () {

  var news = [];
  var latestPrices = [];
  var company = [];
  var fiveTwoWeekLow = [];
  var fiveTwoWeekHigh = [];
  var gotData;
  var allSymbols;
  var watchlist = ["MSFT", "TSLA"];
  var watchstring = watchlist.toString();

  var api = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
  var stock = "input";
  var apiKey = "&types=quote,news,chart&range=1m&last=5";
  var urlkeyz = "https://api.iextrading.com/1.0/stock/market/batch?symbols=fb&types=quote,news,chart&range=1m&last=5";

  // GETTING DATA
  function allSymbols() {
    $.ajax({
      type: "GET",
      url: "https://api.iextrading.com/1.0/ref-data/symbols",
      success: function (data) {
        console.log("all symbols call successful");
        allSymbols = data;
        console.log("testing all symbol data: " + allSymbols["8148"].symbol)
      }
    });
  }


  function getData() {
    watchstring = watchlist.toString();
    console.log("getting data, watchstring: " + watchstring)
    $.ajax({
      type: "GET",
      url: api + watchstring + apiKey,
      success: function (data) {
        console.log("watchlist call successful");
        gotData = data;
        console.log(gotData);
      }
    });

  }

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


  function checker() {
    for (var key in allSymbols) {
      console.log("testing checker: " + allSymbols[key])

    }
  }

  function valueRESET() {
    news = [];
    latestPrices = [];
    company = [];
    fiveTwoWeekLow = [];
    fiveTwoWeekHigh = [];

  }


  // creating cards
  function createCard() {
    valueRESET()

    for (var key in gotData) {
      latestPrices.push(gotData[key].quote.latestPrice)
      company.push(gotData[key].quote.companyName)
      news.push(gotData[key].news[0].headline)
      fiveTwoWeekLow.push(gotData[key].quote.week52Low)
      fiveTwoWeekHigh.push(gotData[key].quote.week52High)
    }

    for (i = 0; i < watchlist.length; i++) {
      $("#cardDisp").append($("<div/>", { "class": "card", "style": "width: 25rem" }).append($("<div/>", { "class": "card-body" }).append($("<h5/>", { "class": "card-title", "id": "symbol", text: watchlist[i] }).append($("<h6/>", { "class": "card-subtitle mb-2 text-muted", "id": "price", text: "$ " + latestPrices[i] }).append($("<h6/>", { "class": "card-subtitle mb-2 text-muted", "id": "price", text: company[i] }))))).append($("<p/>", { "class": "card-text", text: "52 Week Low: $" + fiveTwoWeekLow[i] }).append($("<p/>", { "class": "card-text", text: "52 Week High: $" + fiveTwoWeekHigh[i] }))).append($("<a/>", { "href": "#", "class": "card-link", text: news[i] })))
    }

  }


  // adding to watchlist
  $("#watchInputSubmit").on("click", function () {
    var inputData = $("#watchInput").val();
    inputDataUC = inputData.toUpperCase();
    console.log("inputdata is: " + inputDataUC);
    if (watchlist.includes(inputDataUC) || inputDataUC === "") {
      console.log("error: inputData already exists or is empty");
    } else {
      watchlist.push(inputDataUC);
      console.log(watchlist);
      console.log("getting data");
      getData();
      $("#cardDisp").html("");
      setTimeout(function () {
        createCard()
      }, 1000 * 1);
    }
  });

  //starting app on doc ready
  checker()
  allSymbols()
  getData()
  setTimeout(function () {
    createCard()
  }, 1000 * 1);
  biggestGainers()
  biggestLosers()


})




