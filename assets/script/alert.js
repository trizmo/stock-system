$(document).ready(function () {
  console.log("alert system running");
  var api = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
  var apiKey = "&types=quote,news,chart&range=1m&last=5";
  var symbolArr = [];
  var alertString = "";
  var currentPriceArr = [];


  var config = {
    apiKey: "AIzaSyAlCXQUsNZnHq0ViG6KYg7yNz9a34OuHfE",
    authDomain: "market-system-a6b28.firebaseapp.com",
    databaseURL: "https://market-system-a6b28.firebaseio.com",
    projectId: "market-system-a6b28",
    storageBucket: "market-system-a6b28.appspot.com",
    messagingSenderId: "609139349737"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  // AJAX CALL: for updating current prices for in alertList
  function getData() {
    console.log("getting data, alertString: " + alertString)
    $.ajax({
      type: "GET",
      url: api + alertString + apiKey,
      success: function (data) {
        console.log("alertList call successful");
        gotData = data;
        console.log(gotData);
        
        for(var key in gotData){
          currentPriceArr.push(gotData[key].quote.latestPrice)
          console.log(currentPriceArr)
        }
        createTable()
      }
    });
  }


  // creating and updating alertlist
  // GET FROM DATABASE
  var alertList = "";
  database.ref().on("value", function(snapshot) {
    if(snapshot.hasChild("alertList")){
      alertList = snapshot.val().alertList;
      
      console.log(alertList)
      for(i = 0 ; i < alertList.length; i++){
        symbolArr.push(alertList[i].stock)
        console.log(symbolArr)
        alertString = symbolArr.toString();
        console.log(alertString)
      }
      getData()
      
    }
  });



  var gotData = "";

  
  console.log(alertString)
   

  // submitting user alert details
  $("#submit").on("click", function () {
    var targetP = $("#target-price").val();
    var intTargetP = parseInt(targetP);
    var stockSym = $("#stock").val();
    var stockSymUC = stockSym.toUpperCase();
    alertList.push({ stock: stockSymUC, targetPrice: intTargetP });
    symbolArr.push(stockSymUC.toUpperCase())
    console.log(alertList);
    database.ref().set({
      alertList
    })
    createTable()

  });


  function createTable() {
    $("#tableDisp").empty();


    for (i = 0; i < alertList.length; i++) {
      console.log("i= :" + i)
      console.log()
      var tdTargetP = $("<td>");
      tdTargetP.text(alertList[i].targetPrice)
      var tdStock = $("<td>");
      tdStock.text(alertList[i].stock)
      var tdCurrent = $("<td>");

      tdCurrent.text(currentPriceArr[i])
      var newRow = $("<tr>");
      $("#tableDisp").append(newRow)
      newRow.append(tdStock)
      newRow.append(tdCurrent)
      newRow.append(tdTargetP)
    }
  }









})