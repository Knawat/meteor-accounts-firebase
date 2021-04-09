import firebase from "firebase/app";
import "firebase/auth";

const configs = {
  apiKey: "AIzaSyBiTCTDP8aJt3EIrkrpAN6edFi0hu4aKVI",
  authDomain: "knawat-auth-dev.firebaseapp.com",
  projectId: "knawat-auth-dev",
  storageBucket: "knawat-auth-dev.appspot.com",
  messagingSenderId: "191490571662",
  appId: "1:191490571662:web:7a42f9b509f23cc5f778df"
}

class FirebaseAuth {
  constructor() {
    this.init();
  }

  init() {
    // TODO: use ENV
    this.configs = configs;
    firebase.initializeApp(firebaseConfig);
  }
}

export default FirebaseAuth;
