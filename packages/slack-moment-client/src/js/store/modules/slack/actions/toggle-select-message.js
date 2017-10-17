import debugModule from 'debug';

const debug = debugModule('slack-moment:slack/toggleSelectMessage');

export default async function toggleSelectMessage(store, ts) {
  if (!ts) return;

  if (store.state.selectMessages.includes(ts)) {
    debug('remove selectMessage', ts);
    store.commit('removeSelectMessage', ts);
  } else {
    debug('add selectMessage', ts);
    store.commit('addSelectMessage', ts);
  }
}
