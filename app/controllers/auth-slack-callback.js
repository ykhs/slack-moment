import slack from '@slack/client'
import firebase from 'firebase-admin'
import pify from 'pify'
import debugModule from 'debug'
import config from '../../config'

const debug = debugModule('slack-moment:authSlackCallback')
const WebClient = slack.WebClient

export default async function authSlackCallback (req, res, next) {
  const code = req.query.code

  debug('Receive code', code)

  const options = {
    code,
    'client_id': config.slack.clientId,
    'client_secret': config.slack.clientSecret,
    'redirect_uri': config.slack.authCallbackURL
  }
  let tokenResult
  let customToken

  try {
    tokenResult = await pify(req.oauth2.authorizationCode.getToken)(options)
  } catch (error) {
    console.error('Access Token Error', error.message)
    return res.json('Authentication failed')
  }

  debug('The resulting token: ', tokenResult)

  if (!tokenResult.ok) {
    debug('Error', JSON.stringify(tokenResult))
    next(new Error(tokenResult.error))
  }

  const { access_token, user_id, team_id } = tokenResult
  const web = new WebClient(access_token)
  const { user } = await pify(web).users.info(user_id)

  const db = firebase.database()
  const usersRef = db.ref('users')
  const firebaseUser = {
    access_token,
    id: user.id,
    name: user.name,
    image_192: user.profile.image_192,
    image_24: user.profile.image_24,
    image_32: user.profile.image_32,
    image_48: user.profile.image_48,
    image_72: user.profile.image_72,
    team: team_id
  }

  await usersRef.child(user_id).set(firebaseUser)

  try {
    customToken = await firebase.auth().createCustomToken(user_id)
  } catch (error) {
    console.log('Error creating custom token:', error)
    return res.json('Creating custom token failed')
  }

  res.cookie('token', customToken, {
    secure: config.ssl
  })
  res.redirect('/')
}
