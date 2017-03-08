export function needShowSignIn (state, getters, rootState, rootGetters) {
  const { user, isLoading } = state
  return !user.name && !isLoading
}
