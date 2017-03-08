import debugModule from 'debug'
import firebase from 'firebase'

const debug = debugModule('slack-moment:firebase/watchAuth')
let unsubscribe

export default function watchAuth (store) {
  if (unsubscribe) {
    debug('firebase auth listener is already exists')
    return
  }

  debug('Start watching firebase auth state')
  unsubscribe = firebase.auth().onAuthStateChanged(user => {
    debug('Auth state changed', user)
    store.dispatch('handleAuthStateChanged', user)
  })
}
