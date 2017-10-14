export function setUser(state, user) {
  state.user = user;
}

export function toggleLoading(state, isLoading) {
  state.isLoading = isLoading;
}

export function setLoadingStartAt(state, start) {
  state.loadingStartAt = start;
}

export function resetLoadingStartAt(state) {
  state.loadingStartAt = 0;
}
