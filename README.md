# Market Systems
## By trizCA

This app is currently being rebuilt:
https://github.com/trizmo/market-systems-v3

This app will pull and display market data
[Link to site](https://trizmo.github.io/stock-system/index.html) 

# Features
## Quick info
- Latest market price for major stocks
- Latest market price for cryptocurrencies
- Misc data: Biggest gainers, Biggest losers

## Watchlist Cards
- Misc data: symbol, current price, company name, 52week low, 52week high, 24hr percentage change
- 1 news article

## Target Price Alert
- Currently not operational

# How to use
This system is pretty straight forward, enter in stocks/coins, and it'll give you information on them.

# Build Status
This project it not even being close to complete. There's still a lot more go to!

# Technology Used
- Javascript

## Misc notes
- calls can be made 100 times per second

# Screenshot
<img src="./assets/img/screenshot.jpg">




// const requirejs = require("requirejs");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('1acf2fab34b2404c9eb08311a29d310e');

let newsHolder
let gotNews = false;

function displayNews() {
  if (gotNews === true) {
    console.log("DISPLAYING NEWS:")
    console.log(newsHolder)
  }

}

// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.top-headlines({
  source: 'associated-press', // required
  sortBy: 'top' // optional
}).then(articlesResponse => {
  // console.log(articlesResponse);
  newsHolder = articlesResponse;
  gotNews = true;
  displayNews();




  /*
    {
      status: "ok",
      source: "associated-press",
      sortBy: "top",
      articles: [...]
    }
   */
});
