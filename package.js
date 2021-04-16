Package.describe({
  name: 'accounts-firebase',
  summary: 'Login service via Firebase',
  version: '0.0.0',
});

Package.onUse(api => {
  api.use(['ecmascript']);
  api.use(['check']);
  api.use('accounts-base', ['client', 'server']);

  api.imply('accounts-base', ['client', 'server']);
  api.imply('email', 'server');

  api.addFiles('client.js', 'client');
  api.addFiles('server.js', 'server');

  api.export(['firebase'], 'client');
});

Npm.depends({
  'firebase': '8.3.2',
  'firebase-admin': '9.6.0'
});
