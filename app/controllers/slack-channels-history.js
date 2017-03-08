import slack from '@slack/client'
import pify from 'pify'
import debugModule from 'debug'

const debug = debugModule('slack-moment:slackChannelsHistory')

const WebClient = slack.WebClient

export default async function slackChannelsHistory (req, res, next) {
  const id = req.params.id
  const latest = req.query.latest
  const token = req.token
  const web = new WebClient(token)
  const options = {}

  if (latest) {
    options.latest = latest
  }

  debug(`token: ${token}`)
  debug('Request slack api [channels.history]')

  try {
    const result = await pify(web).channels.history(id, options)
    debug('Request Slack API successed [channels.history]')
    res.status(200).send(result)
  } catch (err) {
    debug('Request Slack API failure [channels.history]')
    next(err)
  }
}
