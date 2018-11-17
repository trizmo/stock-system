$(document).ready(function () {

  var newsData = [];
  var latestPrices = [];
  var company = [];
  var fiveTwoWeekLow = [];
  var fiveTwoWeekHigh = [];
  var changePercent = [];
  var targetPricing = [];
  var aveTotVolume = [];
  var gotData;
  var allSymbols;
  var watchlist = ["MSFT"];
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
    $(".loader").show();
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
    newsData = [];
    latestPrices = [];
    company = [];
    fiveTwoWeekLow = [];
    fiveTwoWeekHigh = [];
    changePercent = [];

  }


  // creating cards
  function createCard() {
    valueRESET()
    $(".loader").hide();

    for (var key in gotData) {
      latestPrices.push(gotData[key].quote.latestPrice)
      company.push(gotData[key].quote.companyName)
      newsData.push(gotData[key].news)
      fiveTwoWeekLow.push(gotData[key].quote.week52Low)
      fiveTwoWeekHigh.push(gotData[key].quote.week52High)
      changePercent.push(gotData[key].quote.changePercent)
      aveTotVolume.push(gotData[key].quote.avgTotalVolume)

    }

    for (i = 0; i < watchlist.length; i++) {
      // creating card details
      $("#cardDisp").append($("<div/>", { "class": "card-wrapper container", "style": "width: 100%" })

        .append($("<div/>", { "class": "row" })

          //top left panel ## info-panel
          .append($("<div/>", { "class": "col-md-6" })
            .append($("<div/>", { "class": "info-panel-text symbol", "id": "symbol", text: watchlist[i] }))
            .append($("<div/>", { "class": "info-panel-text currentPrice", "id": "price", text: "$ " + latestPrices[i] }))
            .append($("<h6/>", { "class": "info-panel-text companyName", "id": "companyName", text: company[i] }))


          )


          //top right panel ## chart-panel
          .append($("<div/>", { "class": "col-md-6", "id": "price", text: "chartWidget" })


          )


        )


        .append($("<div/>", { "class": "row" })

          //bottom left ## data-panel
          .append($("<div/>", { "class": "col-md-6" })
            .append($("<p/>", { "class": "data-panel-text", text: "52 Week Low: $" + fiveTwoWeekLow[i] }))
            .append($("<p/>", { "class": "data-panel-text", text: "52 Week High: $" + fiveTwoWeekHigh[i] }))
            .append($("<p/>", { "class": "data-panel-text", text: "Percentage Change (24hr): " + (changePercent[i] * 100 + "%") }))
            .append($("<p/>", { "class": "data-panel-text", text: "Average Total Volume: $" + aveTotVolume[i] }))



          )

          //bottom right ## operator-panel
          .append($("<div/>", { "class": "col-md-6" })
            .append($("<input/>", { "class": "operator-panel-text alertPriceInput", "id": "targetPriceInput", "placeholder": "Set Alert Price" }))


          )
        )
        // very bottom ## news-panel
        .append($("<div/>", { "class": "row" })

          .append($("<div/>", { "class": "col-md-12 news-panel-text", })
            .append($("<p/>").append($("<a/>", { "href": newsData[i][0].url, "target": "_blank", text: newsData[i][0].headline })))
            // .append($("<p/>").append($("<a/>", { "href": newsData[i][1].url, "target": "_blank", text: newsData[i][1].headline })))
            // .append($("<p/>").append($("<a/>", { "href": newsData[i][2].url, "target": "_blank", text: newsData[i][2].headline })))

          )

        )


      )
    }


  }

  function captureTargetPrice() {
    console.log("captureTargetPrice Running")
    $("#targetPriceInput").keyup(function (e) {
      if (e.keyCode === 13) {
        var value = $("#targetPriceInput").val()
        targetPricing.push(value);
        console.log(targetPricing);

      }
    })

  }


  // adding to watchlist
  $("#watchInput").keyup(function (e){
    if(e.keyCode === 13){
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

    }


  })




  // $("#watchInputSubmit").on("click", function () {
  //   var inputData = $("#watchInput").val();
  //   inputDataUC = inputData.toUpperCase();
  //   console.log("inputdata is: " + inputDataUC);
  //   if (watchlist.includes(inputDataUC) || inputDataUC === "") {
  //     console.log("error: inputData already exists or is empty");
  //   } else {
  //     watchlist.push(inputDataUC);
  //     console.log(watchlist);
  //     console.log("getting data");
  //     getData();
  //     $("#cardDisp").html("");
  //     setTimeout(function () {
  //       createCard()
  //     }, 1000 * 1);
  //   }
  // });

  //starting app on doc ready
  checker()
  allSymbols()
  getData()
  setTimeout(function () {
    createCard()
  }, 250 * 1);

  
  captureTargetPrice()


})




