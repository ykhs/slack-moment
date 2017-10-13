import debugModule from 'debug'
import firebase from 'firebase'
import router from '../../../../router'

const debug = debugModule('slack-moment:firebase/handleAuthStateChanged')

export default async function handleAuthStateChanged (store, user) {
  const options = { root: true }

  if (!user) {
    debug('User is empty')

    store.commit('setUser', {}, options)
    store.dispatch('stopLoading', 800, options)
    router.push('/')
    return
  }

  const database = firebase.database()
  const usersRef = database.ref('users')
  const { uid } = user
  const me = usersRef.child(uid)

  debug('Request user information')

  const ss = await me.once('value')
  const firebaseUser = ss.val()

  debug('Success', firebaseUser)

  store.commit('setUser', firebaseUser, options)
  store.commit('slack/setAccessToken', firebaseUser.access_token, options)
  store.dispatch('stopLoading', 800, options)
}
