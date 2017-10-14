const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  env: env,
  root: path.resolve(__dirname, '..'),
  basicAuth: process.env.BASIC_AUTH || null,
  slack: {
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    authCallbackURL: process.env.SLACK_AUTH_CALLBACK_URL,
    scope: ['channels:read', 'channels:history', 'users:read', 'team:read']
  }
};
