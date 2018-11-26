$(document).ready(function () {
  console.log("alert system running");
  var api = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
  var cryptoApi = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
  var apiKey = "&types=quote,news,chart&range=1m&last=5";
  var symbolArr = [];
  var alertString = "";
  var cryptoAlertString = "";
  var currentPriceArr = [];
  var currentCryptoPriceArr = [];

  var cryptoGotData = "";
  var gotData = "";
  var alertList = {
    stocks: [],
    crypto: []

  };
  var coinArr = [];

  console.log(alertList.crypto)


  var config = {
    apiKey: "AIzaSyAlCXQUsNZnHq0ViG6KYg7yNz9a34OuHfE",
    authDomain: "market-system-a6b28.firebaseapp.com",
    databaseURL: "https://market-system-a6b28.firebaseio.com",
    projectId: "market-system-a6b28",
    storageBucket: "market-system-a6b28.appspot.com",
    messagingSenderId: "609139349737"
  };

  // firebase.initializeApp(config);
  var database = firebase.database();

  // AJAX CALL: for updating current prices for in alertList
  function getData() {
    console.log("getting data, alertString: " + alertString)
    $.ajax({
      type: "GET",
      url: api + "msft" + apiKey,
      success: function (data) {
        console.log("alertList call successful");
        gotData = data;
        console.log(gotData);

        for (var key in gotData) {
          currentPriceArr.push(gotData[key].quote.latestPrice)
          console.log(currentPriceArr)
        }
        createTable()
      }
    });
  }

  // CRYPTO AJAX CALL
  function getCryptoData() {
    console.log("getting data, alertString: " + alertString)
    $.ajax({
      type: "GET",
      url: cryptoApi + "xrp" + apiKey,
      success: function (cryptoData) {
        console.log("alertList call successful");
        cryptoGotData = cryptoData;
        console.log(cryptoGotData);

        for (var key in cryptoGotData) {
          currentCryptoPriceArr.push(cryptoGotData[key].quote.latestPrice)
          console.log(currentCryptoPriceArr)
        }
        createCryptoTable()
      }
    });
  }


  // creating and updating alertlist
  // GET FROM DATABASE
  database.ref().on("value", function (snapshot) {
    if (snapshot.hasChild("alertList")) {
      alertList = snapshot.val().alertList;
      console.log(alertList)
      getData()
      getCryptoData()
    }
    console.log("snapshot not working");
    console.log(snapshot.val().alertList)
  });





  console.log(alertString)


  // CRYPTO USER INPUT
  $("#crypto-submit").on("click", function () {
    var targetP = $("#crypto-target-price").val();
    var intTargetP = parseInt(targetP);
    var cryptoSym = $("#crypto").val();
    var cryptoSymUC = cryptoSym.toUpperCase();
    console.log(alertList)
    alertList.crypto.push({ coin: cryptoSymUC, cryptoTargetPrice: intTargetP });
    coinArr.push(cryptoSymUC.toUpperCase())
    console.log(alertList);
    database.ref().set({
      alertList
    })
    createCryptoTable()

  });


  //STOCK USER INPUT
  $("#submit").on("click", function () {
    var targetP = $("#target-price").val();
    var intTargetP = parseInt(targetP);
    var stockSym = $("#stock").val();
    var stockSymUC = stockSym.toUpperCase();
    console.log(alertList)
    alertList.stocks.push({ stock: stockSymUC, targetPrice: intTargetP });
    symbolArr.push(stockSymUC.toUpperCase())
    console.log(alertList);
    database.ref().set({
      alertList
    })
    createTable()

  });


  function createTable() {
    $("#tableDisp").empty();


    for (i = 0; i < alertList.stocks.length; i++) {

      var tdTargetP = $("<td>");
      tdTargetP.text(alertList.stocks[i].targetPrice)
      var tdStock = $("<td>");
      tdStock.text(alertList.stocks[i].stock)
      var tdCurrent = $("<td>");

      tdCurrent.text(currentPriceArr[i])
      var newRow = $("<tr>");
      $("#tableDisp").append(newRow)
      newRow.append(tdStock)
      newRow.append(tdCurrent)
      newRow.append(tdTargetP)
    }
  }

  function createCryptoTable() {
    $("#cryptoTableDisp").empty();


    for (i = 0; i < alertList.crypto.length; i++) {
      console.log("i= :" + i)
      console.log()

      var tdTargetP = $("<td>");
      tdTargetP.text(alertList.crypto[i].cryptoTargetPrice)
      var tdStock = $("<td>");
      tdStock.text(alertList.crypto[i].coin)
      var tdCurrent = $("<td>");
      tdCurrent.text(currentCryptoPriceArr[i])
      var newRow = $("<tr>");
      $("#cryptoTableDisp").append(newRow)
      newRow.append(tdStock)
      newRow.append(tdCurrent)
      newRow.append(tdTargetP)


    }
  }









})