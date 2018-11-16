$(document).ready(function () {
  var loggedIn = false;



  var config = {
    apiKey: "AIzaSyAlCXQUsNZnHq0ViG6KYg7yNz9a34OuHfE",
    authDomain: "market-system-a6b28.firebaseapp.com",
    databaseURL: "https://market-system-a6b28.firebaseio.com",
    projectId: "market-system-a6b28",
    storageBucket: "market-system-a6b28.appspot.com",
    messagingSenderId: "609139349737"
  }
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("user logged in!!")
      document.location.assign("index.html");

      // User is signed in.
    } else {
      // alert("user NOT logged in- sending back to login page")
      // document.location.assign("login.html");
      // No user is signed in.
    }
  });



  function userVal() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
        console.log("Login successful!");
        $("#logOut").css("visibility", "visible");
        $("#loginState").css("visibility", "visible");
        $("#credErr").css("visibility", "hidden");

        loggedIn = true;
        checkLoggedStatus()
      } else {
        console.log(firebaseUser)
        console.log("NOT LOGGED IN");
        $("#logOut").css("visibility", "hidden");
        loggedIn = false;
        checkLoggedStatus()
      }
    })
  }

  function send_email_val(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
      $("#userVerified").text("Verification email sent")
    }).catch(function(event){
      $("#userVerified").text(event.message)
    })

    

  }


  function checkLoggedStatus() {
    if (loggedIn) {
      goToMS()
      console.log("login successful")
    } else {
      goToLogin()
      console.log("login failed")
    }
  }





  $("#logOut").click(function (event) {
    event.preventDefault();
    firebase.auth().signOut();
    console.log("#logOut clicked!");
    userVal()
  });

  $("#submit").click(function (event) {
    event.preventDefault();
    const userEmail = $("#email").val();
    const userPass = $("#password").val();
    console.log(userEmail + userPass);
    const promise = firebase.auth().signInWithEmailAndPassword(userEmail, userPass);
    promise
      .then(function () {
        userVal()
      })
      .catch(function (event) {
        console.log(event.message);
        $("#credErr").css("visibility", "visible");
        $("#credErr").text(event.message)

      });
  });

  $("#signUp").click(function (event) {
    event.preventDefault();
    const userEmail = $("#email").val();
    const userPass = $("#password").val();
    const promise = firebase.auth().createUserWithEmailAndPassword(userEmail, userPass);
    promise
      .then(function () {
        console.log("user succesfully created")
        send_email_val()
      })
      .catch(function (event) {
        if (event.code === "auth/invalid-email") {
          console.log(event.code + ": " + event.message)
          console.log("bingo")
          $("#credErr").css("visibility", "visible")
          $("#credErr").text(event.message)
        }
      })
  });



  function goToMS() {
    document.location.assign("index.html");
  }
  function goToLogin() {
    document.location.assign("login.html");
  }


});

// var user = firebase.auth().currentUser;
// var name, email, photoUrl, uid, emailVerified;

// if (user != null) {
//   name = user.displayName;
//   email = user.email;
//   photoUrl = user.photoURL;
//   emailVerified = user.emailVerified;
//   uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//   // this value to authenticate with your backend server, if
//   // you have one. Use User.getToken() instead.
// }


