

const queryURL = "https://newsapi.org/v2/top-headlines?country=us"
const search = "bitcoin"
const apiKey = "&apiKey=1acf2fab34b2404c9eb08311a29d310e"

let newsFeedHolder;
let gotNews = false;

function createCard(title, body) {
  let newsCard = $("<div>");
  newsCard.attr("data-news-body", body)
  newsCard.attr("data-news-title", title)
  newsCard.addClass("news-card card-wrapper");
  newsCard.html("<div class='news-card-title'> " + title)

  $(".news-feed").append(newsCard)
}

function newsPreview(title, body) {
  let dispNews = $("<div>");
  dispNews.addClass("news-card card-wrapper");
  dispNews.append("<div class='news-card-title'> " + title)
  dispNews.append("<div class='news-card-body'> " + body)
  $("#newsDisp").html(dispNews)
}


function displayNews() {
  if (gotNews === true) {
    console.log("DISPLAYING NEWS:");
    console.log(newsFeedHolder);



    for (let key in newsFeedHolder) {
      for (i = 2; i < newsFeedHolder[key].length; i++) {

        let title = newsFeedHolder[key][i].title
        let body = newsFeedHolder[key][i].content

        createCard(title, body, key, i)


      }
    }

  }

}

$.ajax({
  url: queryURL + apiKey,
  method: "GET"
}).then(function (response) {
  gotNews = true;
  // console.log(response);
  newsFeedHolder = response;
  displayNews();

});


$(document).on("click", ".news-card", function () {
  let newstitle = ($(this).attr("data-news-title"))
  let newsBody = ($(this).attr("data-news-body"))
  console.log(this)
  console.log(newsFeedHolder)
  
  newsPreview(newstitle, newsBody)


} )



