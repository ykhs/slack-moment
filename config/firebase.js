import dotenv from 'dotenv'
import admin from 'firebase-admin'

dotenv.config()

const config = {
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  admin: {
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
  }
}

export function init () {
  const cert = {
    'client_email': config.admin.clientEmail,
    'private_key': config.admin.privateKey
  }
  admin.initializeApp({
    credential: admin.credential.cert(cert),
    databaseURL: config.databaseURL
  })
}

export default config
