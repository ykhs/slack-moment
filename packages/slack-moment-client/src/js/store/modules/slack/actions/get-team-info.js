import debugModule from 'debug';
import initAxios from './init-axios';

const debug = debugModule('slack-moment:slack/getTeamInfo');

export default async function getTeamInfo(store) {
  store.dispatch('startLoading', 800, { root: true });

  const path = '/slack/team_info';
  const { accessToken } = store.state;
  const axios = initAxios({ accessToken });

  debug(`Request ${path}`);
  const res = await axios.get(path);
  debug(`Receive ${path}`, res);

  store.commit('setTeamInfo', res.data.team);
  store.dispatch('stopLoading', 800, { root: true });
}
