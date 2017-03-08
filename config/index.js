import dotenv from 'dotenv'
import path from 'path'
import firebase from './firebase'

dotenv.config()

const env = process.env.NODE_ENV || 'development'

export default {
  env: env,
  root: path.join(__dirname, '..'),
  basicAuth: process.env.BASIC_AUTH || null,
  slack: {
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    authCallbackURL: process.env.SLACK_AUTH_CALLBACK_URL,
    scope: [
      'channels:read',
      'channels:history',
      'users:read',
      'team:read'
    ]
  },
  firebase: firebase
}

export { default as express } from './express'
export { init as firebase } from './firebase'
export { default as routes } from './routes'
