const slack = require('@slack/client');
const pify = require('pify');
const debugModule = require('debug');

const debug = debugModule('slack-moment:slackUsers');

const WebClient = slack.WebClient;

module.exports = async function slackMembers(req, res, next) {
  const token = req.token;
  const web = new WebClient(token);

  debug(`token: ${token}`);
  debug('Request slack api [users.list]');

  try {
    const result = await pify(web).users.list();
    debug('Request Slack API successed [users.list]');
    res.status(200).send(result);
  } catch (err) {
    debug('Request Slack API failure [users.list]');
    next(err);
  }
};
