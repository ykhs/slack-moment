import Vue from 'vue';

export function setAccessToken(state, accessToken) {
  state.accessToken = accessToken;
}

export function setChannels(state, channels) {
  state.channels = channels;
}

export function setMembers(state, members) {
  state.members = members;
}

export function setMessages(state, { id, messages }) {
  messages = [...(state.messages[id] || []), ...messages];
  Vue.set(state.messages, id, messages);
}

export function addHasMore(state, id) {
  state.hasMoreHistory = [...state.hasMoreHistory, id];
}

export function removeHasMore(state, id) {
  const ids = new Set(state.hasMoreHistory);
  ids.delete(id);
  state.hasMoreHistory = Array.from(ids);
}

export function addSelectMessage(state, ts) {
  const messages = new Set(state.selectMessages);
  messages.add(ts);
  state.selectMessages = Array.from(messages);
}

export function removeSelectMessage(state, ts) {
  const tss = new Set(state.selectMessages);
  tss.delete(ts);
  state.selectMessages = Array.from(tss);
}

export function setTeamInfo(state, team) {
  state.team = team;
}
