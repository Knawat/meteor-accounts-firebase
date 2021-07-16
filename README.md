# meteor-accounts-firebase

Meteor Accounts connector to Firebase & FirebaseUI

# Steps

1. `meteor add knawat:accounts-firebase`
2. Copy config from [console.firebase.google.com](https://console.firebase.google.com) > Project settings > copy config
  ```json
  {
    "public": {
      "firebase": {
        "apiKey": "XXXXXXX",
        "authDomain": "YOUR-APP.firebaseapp.com",
        "projectId": "YOUR-APP",
        "storageBucket": "YOUR-APP.appspot.com",
        "messagingSenderId": "XXXXXXX",
        "appId": "XXXXXXX"
      },
      "firebaseui": {
        // https://github.com/firebase/firebaseui-web#configuring-sign-in-providers
      }
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
- [x] Login and logout Meteor depend on Firebase status.
- [x] Handle `Meteor.onLogout()` to logout from Firebase.
- [x] On logout redirect to login page.
- [x] Export firebase and firebase-admin after app initialized.

