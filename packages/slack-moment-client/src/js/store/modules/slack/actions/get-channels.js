import debugModule from 'debug'
import initAxios from './init-axios'

const debug = debugModule('slack-moment:slack/getChannels')

export default async function getChannels (store) {
  store.dispatch('startLoading', 800, { root: true })

  const path = '/slack/channels'
  const { accessToken } = store.state
  const axios = initAxios({ accessToken })

  debug(`Request ${path}`)
  const res = await axios.get(path)
  debug(`Receive ${path}`, res)

  store.commit('setChannels', res.data.channels)
  store.dispatch('stopLoading', 800, { root: true })
}
