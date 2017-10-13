const simpleOauthModule = require('simple-oauth2');
const config = require('../');

module.exports = function oauth2Client (req, res, next) {
  req.oauth2 = simpleOauthModule.create({
    client: {
      id: config.slack.clientId,
      secret: config.slack.clientSecret
    },
    auth: {
      tokenHost: 'https://slack.com',
      authorizePath: '/oauth/authorize',
      tokenPath: '/api/oauth.access'
    }
  })
  next()
}
