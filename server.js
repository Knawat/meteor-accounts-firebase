import FirebaseAuth from './firebase-auth.js';

Meteor.startup(() => new FirebaseAuth());

const publishFields = [
  'services',
];

Meteor.publish('auth.user.info', () =>
  Meteor.users.find(Meteor.userId(), {
    fields: publishFields.reduce((acc, crr) => {
      acc[crr] = 1;
      return acc;
    }, {}),
  })
);

Accounts.registerLoginHandler('firebase', firebaseLoginHandler);

Accounts.onLogin(res => {	
  const user = res.user;
  const firebaseToken = user?.services?.firebase?.token;

  if (!firebaseToken) return;

  updateAppUser(user.id, firebaseToken);
  // TODO: Fetch all user data from token
})

/**
 * Update the data in the app database
 * @param {String} token
 */
export function updateAppUser(token) {
  const sanitizedUser = {
    'services.firebase.token': token,
  };
  Meteor.users.update(id, { $set: sanitizedUser });
}

/**
 * Function to login the user
 * @param {*} options 
 */
function firebaseLoginHandler(userToken) {
  if (!userToken) throw new Error('Can not login. No token.');

  const user = Accounts.updateOrCreateUserFromExternalService('firebase', { id: userToken });
  updateAppUser(user.userId, userToken);

  return user;
}
