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
    .then((user) => {
      console.log({user})

      const createdUser = Accounts.updateOrCreateUserFromExternalService('firebase', {
        id: user.uid
      });

      if (createdUser.userId){
        console.log({createdUser})
        Meteor.users.update({_id: createdUser.userId}, {
          $set: {
            profile: user,
            emails: [{
              value: user.email
            }]
          }
        })
      }

      return createdUser;
    })
    .catch((error) => {
      throw new Meteor.Error(error);
    });

});
