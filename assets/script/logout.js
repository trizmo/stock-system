$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyAlCXQUsNZnHq0ViG6KYg7yNz9a34OuHfE",
    authDomain: "market-system-a6b28.firebaseapp.com",
    databaseURL: "https://market-system-a6b28.firebaseio.com",
    projectId: "market-system-a6b28",
    storageBucket: "market-system-a6b28.appspot.com",
    messagingSenderId: "609139349737"
  }

  firebase.initializeApp(config);

  $("#logOut").click(function (event) {
    firebase.auth().signOut();
    console.log("#logOut clicked!")
    goToLogin()
  });

  function goToLogin() {
    document.location.assign("login.html");
  }

  
})