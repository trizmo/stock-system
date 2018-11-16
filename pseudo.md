# Future features
## Alert System
### Alerts user if alert conditions are met
In progress
- user price input
- 

## New cards
- 3 rows
-- first two rows with 2x columns
-- third row with one column
- col1: symbol, price, 

## info-panel
SYM 
PRice
Company Name

## chart-panel
2 week simple line chart

## data-panel
52weeklow
52weekhigh
24hr percent change
24hr volume

## operator-panel
alert input

## news-panel
news headlines



################
# login
- user enters email and password
- determine if correct
  - if correct send to market-systems page
  - else advise user and clear fields


# sign-up
- user enters email and password
- determine if existing
  -if existing, return back to login page
  -else add user to Auth
    -return back to login page


# log-out
- if user is signed in log-out button is available
  - else login or sign up only appears

# login status

















































MSFT.news[""0""].headline




<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div id="tradingview_1c003"></div>
  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span class="blue-text">AAPL chart</span></a> by TradingView</div>
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  new TradingView.widget(
  {
  "autosize": true,
  "symbol": "NASDAQ:AAPL",
  "interval": "D",
  "timezone": "Etc/UTC",
  "theme": "Light",
  "style": "2",
  "locale": "en",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "hide_top_toolbar": true,
  "hide_legend": true,
  "save_image": false,
  "container_id": "tradingview_1c003"
}
  );
  </script>
</div>
<!-- TradingView Widget END -->



          .append($("<div/>", { "class": "col-md-12 news-panel-text",})
            .append($("<div/>", { "href": newsData[i][0].url, "target": "_blank", "class": "card-link", text: newsData[i][0].headline }))
            .append($("<div/>", { "href": newsData[i][1].url, "target": "_blank", "class": "card-link", text: newsData[i][1].headline }))
            .append($("<div/>", { "href": newsData[i][2].url, "target": "_blank", "class": "card-link", text: newsData[i][2].headline }))
            
          )
