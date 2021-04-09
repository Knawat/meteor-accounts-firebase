Meteor.startup(() => Meteor.subscribe('auth.user.info'));

Accounts.registerClientLoginFunction('firebase', loginWithFirebase);

Meteor.loginWithFirebase = (...args) => Accounts.applyLoginFunction('firebase', args);

/**
 * 
 * @param {*} callback 
 */
async function loginWithFirebase() {
  firebase.auth().onAuthStateChanged(((user) => {
    if (user && Meteor.loggingIn() === false) {
        user.getToken().then(((token) => {
            Accounts.callLoginMethod({ methodArguments: [{ firebaseToken: token }] });
        }))
    } else if (!user) {
        Meteor.logout()
        // TODO: redirect to accounts.knawat.com with redirect query params to current page
    }
  }));
};
