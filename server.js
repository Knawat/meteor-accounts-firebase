import { check } from "meteor/check"
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
Accounts.registerLoginHandler('firebase', ({ token }) => {
  check(token, String);

  return admin
    .auth()
    .verifyIdToken(token)
    .then(({ uid }) => Accounts.updateOrCreateUserFromExternalService('firebase', {
      id: uid
    }))
    .catch((error) => {
      throw new Meteor.Error(error);
    });

});
