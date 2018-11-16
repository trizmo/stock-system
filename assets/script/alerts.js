class Alert {
  constructor(stock, targetPrice) {
    this.stock = stock;
    this.targetPrice = this.targetPrice;
  }
}


let alert;

$().click(function() {
alert = new Alert();  

});