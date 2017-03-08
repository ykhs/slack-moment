import slack from '@slack/client'
import pify from 'pify'
import debugModule from 'debug'

const debug = debugModule('slack-moment:slackChannels')

const WebClient = slack.WebClient

export default async function slackChannels (req, res, next) {
  const token = req.token
  const web = new WebClient(token)

  debug(`token: ${token}`)
  debug('Request slack api [channels.list]')

  try {
    const result = await pify(web).channels.list()
    debug('Request Slack API successed [channels.list]')
    res.status(200).send(result)
  } catch (err) {
    debug('Request Slack API failure [channels.list]')
    next(err)
  }
}
