# meteor-accounts-firebase


# Steps

1. `meteor add knawat:accounts-firebase`
2. Copy config from console.firebase.google.com > Project settings > copy config
  ```json
  {
    "public": {
      "firebase": {
        "apiKey": "AIzaSyBiTCTDP8aJt3EIrkrpAN6edFi0hu4aKVI",
        "authDomain": "knawat-auth-dev.firebaseapp.com",
        "projectId": "knawat-auth-dev",
        "storageBucket": "knawat-auth-dev.appspot.com",
        "messagingSenderId": "191490571662",
        "appId": "1:191490571662:web:7a42f9b509f23cc5f778df"
      },
      "firebaseui": {}
    }
  }
  ```

## Configs
### All configs should be placed inside `Meteor.settings.public`

#### `firebase` required
Should contain the values to initialize firebase with

Example:
```
"firebase": {
  "apiKey": "XXXXXXXX",
  "authDomain": "YYYYYYYY.firebaseapp.com",
  "projectId": "YYYYYYYY",
  "storageBucket": "YYYYYYYY.appspot.com",
  "messagingSenderId": "1234567890",
  "appId": "ZZZZZZZ"
},
```

#### `firebaseui` optional
Allow to include firebaseui for login flow inside app

`version`: `4.8.0` optional

`init`: ui config to initialize firebaseui

Example:
```
"signInFlow": "popup",
"tosUrl": "your-tos-url",
"privacyPolicyUrl": "privacy-policy-url"
```

## Todo:
1. Login and logout Meteor depend on Firebase status.
2. Handle `Meteor.onLogout()` to logout from Firebase.
3. On logout redirect to login page.
4. Firebase configs should be parameter.
5. Export firebase and firebase-admin after app initialized.

