import debugModule from 'debug'
import firebase from 'firebase'
import Cookies from 'js-cookie'

const debug = debugModule('slack-moment:firebase/tokenSignInIfNeeded')

export default async function tokenSignInIfNeeded (store) {
  const auth = firebase.auth()
  const token = Cookies.get('token')

  if (token) {
    debug('Token found')
    debug('Sign in with custom token')
    await auth.signInWithCustomToken(token)
    debug('Success')
    Cookies.remove('token')
  }
}
