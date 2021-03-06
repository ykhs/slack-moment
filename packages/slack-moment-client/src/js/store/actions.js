export function startLoading(store) {
  const { isLoading } = store.state;
  const start = Date.now();

  if (isLoading) {
    store.commit('setLoadingStartAt', start);
    return;
  }

  store.commit('toggleLoading', true);
  store.commit('setLoadingStartAt', start);
}

export function stopLoading(store, timeAllowed) {
  timeAllowed = timeAllowed || 800;

  const { isLoading, loadingStartAt } = store.state;

  if (!isLoading) return;

  const sparseTime = timeAllowed - (Date.now() - loadingStartAt);

  setTimeout(() => {
    store.commit('toggleLoading', false);
    store.commit('resetLoadingStartAt');
  }, sparseTime > 0 ? sparseTime : 200);
}
