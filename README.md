# meteor-accounts-firebase

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

`enabled`: `true` | `false` required
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

