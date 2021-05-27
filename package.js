Package.describe({
  name: 'knawat:accounts-firebase',
  version: '1.0.1',
  summary: 'Login service via Firebase Authentication',
  git: 'https://github.com/Knawat/meteor-accounts-firebase.git',
  documentation: 'README.md'
});

Package.onUse(api => {
  api.versionsFrom('1.8.2');
  api.use(['ecmascript', 'check']);
  api.use('accounts-base', ['client', 'server']);

  api.addFiles('style.css', 'client');
  api.addFiles('client.js', 'client');
  api.addFiles('firebaseui.js', 'client');
  api.addFiles('server.js', 'server');

  api.export(['firebase'], 'client');
  api.export(['firebase_admin'], 'server');
});

Npm.depends({
  'firebase': '8.3.2',
  'firebase-admin': '9.6.0',
});
