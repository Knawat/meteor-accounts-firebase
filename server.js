import { check } from 'meteor/check'

Accounts.registerLoginHandler('firebase', ({ token }) => {
  check(token, String);

  //TODO: Validate the token from firebase admin

  return Accounts.updateOrCreateUserFromExternalService('knawat', { id: token });
});
