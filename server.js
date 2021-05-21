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

// Since Meteor server runs synchronosly, we used Meteor.methods to wrap code asynchronously,
// This allows user data to be resolved before continouing with rest of the logic
Meteor.methods({
  'firebase.verify': (token) => {
      return admin.auth().verifyIdToken(token).catch(error => {
        throw new Meteor.Error(error);
      });
  }
});

Accounts.registerLoginHandler('firebase', ({ token }) => {
  check(token, String);

  const userData = Meteor.call('firebase.verify', token);
  
  const user = Accounts.updateOrCreateUserFromExternalService('firebase', {
    id: userData.uid
  });

  if (user.userId){
    Meteor.users.update({_id: user.userId}, {
      $set: {
        profile: user,
        emails: [{
          value: user.email,
          verified: user.email_verified
        }]
      }
    })
  }

  return user;
});

export { admin as firebase_admin }