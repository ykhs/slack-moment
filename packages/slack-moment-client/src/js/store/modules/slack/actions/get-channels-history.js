import debugModule from 'debug';
import initAxios from './init-axios';

const debug = debugModule('slack-moment:slack/getChannelsHistory');

export default async function getChannelsHistory(store, { id, latest }) {
  store.dispatch('startLoading', 800, { root: true });

  const path = `/slack/channels/${id}/history`;
  const { accessToken } = store.state;
  const axios = initAxios({ accessToken });

  debug(`Request ${path}`);
  const res = await axios.get(path, {
    params: {
      latest: latest
    }
  });
  debug(`Receive ${path}`, res);

  const { messages, has_more: hasMore } = res.data;

  store.commit('setMessages', { id, messages });

  if (hasMore) {
    store.commit('addHasMore', id);
  } else {
    store.commit('removeHasMore', id);
  }

  store.dispatch('stopLoading', 800, { root: true });
}
