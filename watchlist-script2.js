$(document).ready(function () {

  var news = [];
  var latestPrices = [];
  var company = [];
  var gotData;
  var watchlist = ["MSFT", "TSLA"];
  var watchstring = watchlist.toString();

  var api = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
  var stock = "input";
  var apiKey = "&types=quote,news,chart&range=1m&last=5";
  var urlkeyz = "https://api.iextrading.com/1.0/stock/market/batch?symbols=fb&types=quote,news,chart&range=1m&last=5";

  // GETTING DATA
  function getData() {
    watchstring = watchlist.toString();
    console.log("getting data, watchstring: " + watchstring)
    $.ajax({
      type: "GET",
      url: api + watchstring + apiKey,
      success: function (data) {
        console.log("call successful");
        gotData = data;
        console.log(gotData);
      }
    });

  }


  function createCard() {
    console.log("data for createCard: " + gotData);
    news = [];
    latestPrices = [];
    company = [];

    for (var key in gotData) {
      console.log("SUCCESS" + gotData[key]);
      latestPrices.push(gotData[key].quote.latestPrice)
      company.push(gotData[key].quote.companyName)
      news.push(gotData[key].news[0].headline)
      console.log(gotData[key].news[0].headline)
      // fiveTwoWeekLow.push(gotData[key].quote.latestPrice)
      console.log(latestPrices);
    }

    for (i = 0; i < watchlist.length; i++) {
      $("#cardDisp").append($("<div/>", { "class": "card", "style": "width: 30rem" }).append($("<div/>", { "class": "card-body" }).append($("<h5/>", { "class": "card-title", "id": "symbol", text: watchlist[i] }).append($("<h6/>", { "class": "card-subtitle mb-2 text-muted", "id": "price", text: "$ "+latestPrices[i] }).append($("<h6/>", { "class": "card-subtitle mb-2 text-muted", "id": "price", text: company[i] }))))).append($("<p/>", { "class": "card-text",text: "Some quick example text to build on the card title and make up the bulk of the card's content." })).append($("<a/>", { "href": "#", "class": "card-link", text: news[i] })))
    }

  }


  $("#watchInputSubmit").on("click", function () {
    var inputData = $("#watchInput").val();
    if (watchlist.includes(inputData) || inputData === "") {
      console.log("error: inputData already exists or is empty");
    } else {
      inputDataUC = inputData.toUpperCase();
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

  // $("#get-data").on("click", function () {
  //   console.log("getting data");
  //   getData();
  //   $("#cardDisp").html("");
  //   setTimeout(function () {
  //     createCard()
  //   }, 1000 * 1);
  // })

  // $("#refresh").on("click", function () {
  //   console.log("refreshed, watchstring: " + watchstring);
  //   console.log("refresh clicked");
  //   $("#cardDisp").html("");
  //   setTimeout(function () {
  //     createCard()
  //   }, 1000 * 1);
  // })


  getData()
  setTimeout(function () {
    createCard()
  }, 1000 * 1);


})




