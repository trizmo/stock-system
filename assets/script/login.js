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

  var loggedIn = false;
  function checkLoggedStatus() {
    if (loggedIn) {
      goToMS()
      console.log("login successful")
    } else {
      // goToLogin()
      console.log("login failed")
    }
  }



  $("#logOut").click(function (event) {
    firebase.auth().signOut();
    alert("#logOut clicked!");
  });

  $("#submit").click(function (event) {
    event.preventDefault();

    const userEmail = $("#email").val();
    const userPass = $("#password").val();
    console.log(userEmail + userPass);
    const promise = firebase.auth().signInWithEmailAndPassword(userEmail, userPass);
    promise
      .then()
      .catch(event => console.log(event.message));

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
        // $("#logOut").removeClass("hide");
        // $("#logOut").addClass("show");
        $("#logOut").css("visibility", "visible");
        checkLoggedStatus()
      } else {
        console.log("NOT LOGGED IN");
        // $("#logOut").addClass("hide");
        // $("#logOut").removeClass("show");
        $("#logOut").css("visibility", "hidden");
        console.log(firebaseUser)

        loggedIn = false;
        checkLoggedStatus()
      }
    })


  });

  $("#signUp").click(function (event) {
    event.preventDefault();

    const userEmail = $("#email").val();
    const userPass = $("#password").val();
    const promise = firebase.auth().createUserWithEmailAndPassword(userEmail, userPass);
    promise
      .then(event => loggedIn = true)
      .catch(event => console.log(event.message));

  });



  function goToMS() {
    // document.location.assign("index.html");
  }
  function goToLogin() {
    // document.location.assign("login.html");
  }


});




