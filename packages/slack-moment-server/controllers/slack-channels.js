const slack = require('@slack/client');
const pify = require('pify');
const debugModule = require('debug');

const debug = debugModule('slack-moment:slackChannels');

const WebClient = slack.WebClient;

module.exports = async function slackChannels(req, res, next) {
  const token = req.token;
  const web = new WebClient(token);

  debug(`token: ${token}`);
  debug('Request slack api [channels.list]');

  try {
    const result = await pify(web).channels.list();
    debug('Request Slack API successed [channels.list]');
    res.status(200).send(result);
  } catch (err) {
    debug('Request Slack API failure [channels.list]');
    next(err);
  }
};
