import firebase from "firebase/app";
import "firebase/auth";

Meteor.startup(() => {
  window.firebase = firebase;
  // FIXME: Move this part to init function to get config from parent app
  firebase.initializeApp({
    apiKey: "AIzaSyBiTCTDP8aJt3EIrkrpAN6edFi0hu4aKVI",
    authDomain: "knawat-auth-dev.firebaseapp.com",
    projectId: "knawat-auth-dev",
    storageBucket: "knawat-auth-dev.appspot.com",
    messagingSenderId: "191490571662",
    appId: "1:191490571662:web:7a42f9b509f23cc5f778df"
  });

  Accounts.registerClientLoginFunction('firebase', (token) => {
    Accounts.callLoginMethod({
      methodArguments: [{ token }],
      userCallback: (error) => {
        console.log(error);
      }
    });
  });

  firebase.auth().onAuthStateChanged(((user) => {
    if (user && Meteor.loggingIn() === false) {
      user.getIdToken().then(((token) => {
        Accounts.callLoginFunction('firebase', token);
      }))
    } else {

      if (Meteor.loggingIn()) {
        Meteor.logout()
      }

      // const loginUrl = Meteor.settings.public.loginUrl;
      // const searchQuery = Object.entries({ redirect: window.location.href })
      //   .map(([key, val]) => val && `${key}=${val}`)
      //   .join('&');
      // const accountsLogin = `${loginUrl}/login?${searchQuery}`;
      // window.location.href = accountsLogin;
    }
  }));
})

// In case you calling Meteor.logout() from the client side
Accounts.onLogout(() => {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  }
})

export { firebase };