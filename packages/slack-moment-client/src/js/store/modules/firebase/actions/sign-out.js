import debugModule from 'debug'
import firebase from 'firebase'

const debug = debugModule('slack-moment:firebase/signOut')

export default async function signOut () {
  debug('sign out')
  await firebase.auth().signOut()
  debug('success')
}
