console.log("watchlist-script is RUNNING");

var watchlist = [];
var index = [];
var gotData;


var api = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
var stock = "input";
var apiKey = "&types=quote,news,chart&range=1m&last=5";
var urlkeyz = "https://api.iextrading.com/1.0/stock/market/batch?symbols=fb&types=quote,news,chart&range=1m&last=5";


$(document).ready(function () {
  for (let i = 0; i < watchlist.length; i++) {
    $("#symbol").append("<p>" + watchlist[i] + "</p>")
    $("#stockNo").append("<p>" + (i + 1) + "</p>")
  }


  $("#watchInputSubmit").on("click", function () {
    console.log("submit button clicked");

    var inputData = $("#watchInput").val();
    if (inputData === "" || watchlist.includes(inputData)) {
      console.log("error: input data already exists or is empty");

    } else {
      watchlist.push(inputData.toUpperCase());
      for (let i = 0; i < watchlist.length; i++) {
        $("#symbol").html("<p>" + watchlist[i] + "</p>")
        $("#stockNo").html("<p>" + (i + 1) + "</p>")
      }
    }
  })

  $("#get-data").on("click", function () {
    var watchstring = watchlist.toString();
    $.ajax({
      type: "GET",
      url: api + watchstring + apiKey,
      success: function (data) {
        console.log("call successful");
        gotData = data;
        console.log(gotData);
      }
    });
  })

  $("#refresh").on("click", function () {
    console.log("refresh clicked");
    for (let key in gotData) {
      console.log("SUCCESS" + gotData[key]);
      index.push(gotData[key].quote.latestPrice)
      console.log(index);
    }
    for (let i = 0; i < index.length; i++) {
      $("#price").html("<p>" + "$" + index[i] + "</p>")

    }
  })





})  // end of document ready function






// function pushData() {
//   var inputData = document.getElementById("watchInput").value;
//   if (inputData !== "") {
//     watchlist.push(inputData);
//   }
//   for(i = 0; i < watchlist.length; i++){
//     $("#symbol").append("<p>" + watchlist[i]+ "</p>")
//   }
//   console.log(watchlist);
// }


// var stockRequest = new XMLHttpRequest();
// request.open("GET", url, true);
// request.onload = function (){
//   var data = JSON.parse(this.response);
//   var lastPrice = data.quote.latestPrice;
//   console.log(lastPrice);

// }










// $("#watchInputSubmit").on("click", function () {
//   console.log("click is working");
//     $.ajax({
//       type: "GET",
//       // url: api + stock + apiKey,
//       url: api + "dbx" + apiKey,
//       success: function (data) {
//         console.log("calling url: " + api + watchlist[0] + apiKey);
//         console.log("ajax call SUCCESSFUL")
//         $("#data-feed").html(data);
//         console.log("watchlist[i] is: " + watchlist[i]);
//         console.log("close is: " + close);
//         console.log(close);
//         // console.log("Today's date is: " + fullDate);

//         $("#price").append("<p>" + close + "</p>"); //output to html
//         $("#symbol").append("<p>" + watchlist[i] + "</p>");
//       }
//     });

//     $("#symbol").append("<p>" + watchlist[i]+ "</p>")

// })
