import debugModule from 'debug';
import initAxios from './init-axios';

const debug = debugModule('slack-moment:slack/getMembers');

export default async function getMembers(store) {
  store.dispatch('startLoading', 800, { root: true });

  const path = '/slack/members';
  const { accessToken } = store.state;
  const axios = initAxios({ accessToken });

  debug(`Request ${path}`);
  const res = await axios.get(path);
  debug(`Receive ${path}`, res);

  store.commit('setMembers', res.data.members);
  store.dispatch('stopLoading', 800, { root: true });
}
