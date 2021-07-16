Package.describe({
  name: 'knawat:accounts-firebase',
  version: '1.0.6',
  summary: 'Login service via Firebase Authentication',
  git: 'https://github.com/Knawat/meteor-accounts-firebase.git',
  documentation: 'README.md'
});

Package.onUse(api => {
  api.versionsFrom('1.8.2');
  api.use(['ecmascript', 'check']);
  api.use('accounts-base', ['client', 'server']);

  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');

  api.addFiles('style.css', 'client');
  api.addFiles('firebaseui.js', 'client');
});

Npm.depends({
  'firebase': '8.3.2',
  'firebase-admin': '9.6.0',
});
