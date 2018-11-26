// creating the URL
var cryptoApi = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=";
var coin = "input";
var toUSD = "&to_currency=USD";
var https = require("https");

let symUC = "";
let currentP = "";
let targetTop = [];
let targetBottom = [];
let notAlert = true;
let sym = "";
let targetPrice = "";
let type = "";



var capiKey = "&apikey=N06BDYLYWYZK0MA6"; //PRIVATE KEY

let alert;
var alertList = require("../../../boy-algo/alertList.js")
// console.log(alertList)


var config = {
  apiKey: "AIzaSyAlCXQUsNZnHq0ViG6KYg7yNz9a34OuHfE",
  authDomain: "market-system-a6b28.firebaseapp.com",
  databaseURL: "https://market-system-a6b28.firebaseio.com",
  projectId: "market-system-a6b28",
  storageBucket: "market-system-a6b28.appspot.com",
  messagingSenderId: "609139349737"
};

firebase.initializeApp(config);
const database = firebase.database();

function updateFirebase() {
  database.ref().set({
    alertList
  })
}

function sendToFirebase(target){
  database.ref("alertList").push({
    target
  })
}




// updateFirebase()

$(document).ready(function () {
  let newList

  database.ref().on("value", function (snapshot) {
    console.log("Firebase Snapshot: ")

    newList = snapshot.val()
    console.log(newList.alertList[6])
    $("#dataRows").empty();

    for(let key in newList.alertList){
      console.log(newList.alertList[key])
    }


    for(let key in newList.alertList){
      $("#dataRows").append($("<tr/>")
        .append($("<th/>", { scope: "row", text: 1 + 1 }))
        .append($("<td/>", { text: newList.alertList[key].symbol }))
        .append($("<td/>", { text: newList.alertList[key].current }))
        .append($("<td/>", { text: newList.alertList[key].targetDN }))
        .append($("<td/>", { text: newList.alertList[key].targetUP }))
        .append($("<td/>", { text: newList.alertList[key].type })))
    }
  });


  $("#alertSubmitBtn").on("click", function () {


    console.log(newList)
    console.log("Submit Button Clicked")
    sym = $("#symbolInput").val();
    symUC = sym.toUpperCase();
    targetPrice = $("#targetInput").val();
    type = $("#typeInput").val();
    console.log("Ready to Update DB: sym- " + sym + " targetPrice- " + targetPrice + " type- " + type);


    for (let i = 0; i < newList.alertList.length; i++) {
      if (symUC === newList.alertList[i].symbol) {
        notAlert = false;
        console.log("Alert already created");
        console.log(newList.alertList[i].symbol);
      }
    }


    console.log(type)
    if (type === "crypto") {
      $.ajax({
        type: "GET",
        url: cryptoApi + symUC + toUSD + capiKey,
        success: function (data) {
          console.log(data)
          currentP = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]; //location of current exchange rate
          console.log("coin price: " + currentP)
          console.log(typeof (currentP))
        }
      });
    }

    else if (type === "stock") {
      const options = {
        hostname: "api.iextrading.com",
        port: 443,
        path: "/1.0/stock/" + symUC + "/price",
        method: "GET"
      }
      let price = ""
      req = https.get(options, function (res) {
        res.on("data", function (data) {
          price += data;
          currentP = price
          console.log("stock price: " + currentP)
          console.log(typeof (currentP))
        })
        res.on("end", function () {
        })
      })
    }

    if (currentP > targetPrice) {
      targetBottom = targetPrice;
      targetTop = 0;
    } else {
      targetTop = targetPrice;
      targetBottom = 0
    }

    console.log(targetBottom)
    console.log(targetTop)





    setTimeout(function () {
      let newAlert = {
        symbol: symUC,
        targetUP: targetTop,
        targetDN: targetBottom,
        current: currentP,
        type: type,
        triggered: false
      }

      console.log(newAlert)

      database.ref("alertList").push({
        symbol: symUC,
        targetUP: [targetTop],
        targetDN: [targetBottom],
        current: currentP,
        type: type,
        triggered: false
      })

      // sendToFirebase({
      //   symbol: symUC,
      //   targetUP: targetTop,
      //   targetDN: targetBottom,
      //   current: currentP,
      //   type: type,
      //   triggered: false
      // })

  

    }, 1000)

  })

})



