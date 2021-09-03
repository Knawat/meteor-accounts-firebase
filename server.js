import { check } from "meteor/check"
import admin from "firebase-admin";

Meteor.startup(() => {
  if (!admin.credential.applicationDefault().projectId) {
    console.warn('firebase-admin did not initialize, missing credentials');
    return;
  }

  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
})

// Since Meteor server runs synchronously, we used Meteor.methods to wrap code asynchronously,
// This allows user data to be resolved before continuing with rest of the logic
Meteor.methods({
  'firebase.verify': (token) => {
    return admin.auth().verifyIdToken(token).then(({ uid }) => admin
      .auth()
      .getUser(uid)).catch(error => {
        throw new Meteor.Error(error);
      });
  }
});

Accounts.registerLoginHandler('firebase', ({ token }) => {
  check(token, String);
  if (!admin.credential.applicationDefault().projectId) {
    throw new Meteor.Error('Firebase config missing. Check firebase object under Meteor public settings');
  }
  const userData = Meteor.call('firebase.verify', token);

  return Accounts.updateOrCreateUserFromExternalService('firebase', {
    id: userData.uid,
  }, userData);

});

Accounts.onExternalLogin((options) => {

  const phoneNumber = options.phone_number || options.providerData.find(provider => provider.phoneNumber)

  return {
    profile: {
      name: options.displayName || options.providerData.find(provider => provider.displayName),
      photoURL: options.photoURL || options.providerData.find(provider => provider.photoURL)
    },
    roles: Object.values(options.customClaims),
    phones: phoneNumber ? [{
      value: options.phone_number
    }] : undefined,
    emails: [{
      value: options.email,
      verified: options.emailVerified,
    }]
  };
});

export { admin as firebaseAdmin };
