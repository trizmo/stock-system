console.log("watchlist-script is RUNNING");

var watchlist = ["dbx", "msft", "sndx", "tsla"];    // initiating watchlist array (will later be objects)
var index = [];   // initiating index extra array to push

// creating the API link for stocks info getting
var api = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
var stock = "input";
var apiKey = "&types=quote,news,chart&range=1m&last=5";
url = "https://api.iextrading.com/1.0/stock/market/batch?symbols=fb&types=quote,news,chart&range=1m&last=5";


$(document).ready(function () {
  for (i = 0; i < watchlist.length; i++) {
    $("#symbol").append("<p>" + watchlist[i] + "</p>")
  }


  $("#watchInputSubmit").on("click", function () {
    console.log("submit button clicked");

    var inputData = $("#watchInput").val();
    if (inputData === "" || watchlist.includes(inputData)) {
      console.log("error: input data already exists or is empty");

    } else {
      watchlist.push(inputData.toUpperCase());
      $("#symbol").append("<p>" + watchlist[i] + "</p>")
    }

  })

  $("#refresh").on("click", function () {
    console.log("refresh running");
    for (i = 0; i < watchlist[i]; i++) {
      console.log("refresh loop: " + watchlist[i])
      $.ajax({
        type: "GET",
        // url: api + stock + apiKey,
        url: api + watchlist[i] + apiKey,
        success: function (data) {
          console.log("call successful: " + watchlist[i].toUpperCase());
          // let close = data['Time Series (Daily)'] + [fullDate] + ['4. close']; //location of closing price (need to figure out how to automatically get last price)
          let close = data[watchlist[i].toUpperCase()]["quote"]["latestPrice"];

          console.log(close);
          // console.log("Today's date is: " + fullDate);

          $("#price").html(close); //output to html
          $("#price").prepend(watchlist[i].toUpperCase() + ": $"); //adds stock name
        }
      });


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
