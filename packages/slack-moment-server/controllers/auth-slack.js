const debugModule = require('debug');
const config = require('../config');

const debug = debugModule('slack-moment:authSlack')

module.exports = function authSlack (req, res) {
  const scope = config.slack.scope.join(',')
  debug(
    'Create authorization uri with option',
    config.slack.authCallbackURL,
    scope
  )
  const authorizationUri = req.oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.slack.authCallbackURL,
    scope
  })

  debug('Authorization uri', authorizationUri)

  res.redirect(authorizationUri)
}
