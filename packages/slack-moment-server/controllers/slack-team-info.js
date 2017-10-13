const slack = require('@slack/client');
const pify = require('pify');
const debugModule = require('debug');

const debug = debugModule('slack-moment:slackTeamInfo')

const WebClient = slack.WebClient

module.exports = async function slackTeamInfo (req, res, next) {
  const token = req.token
  const web = new WebClient(token)

  debug(`token: ${token}`)
  debug('Request slack api [team.info]')

  try {
    const result = await pify(web).team.info()
    debug('Request Slack API successed [team.info]')
    res.status(200).send(result)
  } catch (err) {
    debug('Request Slack API failure [team.info]')
    next(err)
  }
}
