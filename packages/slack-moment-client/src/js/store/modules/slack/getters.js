import fecha from 'fecha'

export function memberChannels (state) {
  return state.channels.filter(c => c.is_member)
}

export function findMemberById (state) {
  return function (id) {
    const { members } = state
    const member = members.find(m => m.id === id)
    return member || {}
  }
}

export function findChannelById (state) {
  return function (id) {
    const { channels } = state
    const channel = channels.find(c => c.id === id)
    return channel || {}
  }
}

export function messageHistory (state) {
  return function (id) {
    return (state.messages[id] || []).filter(m => {
      return m.type === 'message' && !m.subtype
    })
  }
}

export function latestHistory (state) {
  return function (id) {
    return [...(state.messages[id] || [])].pop()
  }
}

export function formatMarkdownMessage (state, getters) {
  return function ({ id, ts }) {
    const message = state.messages[id].find(m => m.ts === ts)
    const team = state.team
    const channel = getters.findChannelById(id)
    const member = getters.findMemberById(message.user)
    const [time] = ts.split('.')
    const formatDate = fecha.format((+time) * 1000, 'YYYY-MM-DD ddd HH:mm:dd')
    const messageId = `p${ts.split('.').join('')}`
    const markdown = `**${member.name}** - [${formatDate}](https://${team.domain}.slack.com/archives/${channel.name}/${messageId})

${message.text}

- - -

`
    return {
      channel: id,
      ts,
      message,
      member,
      markdown
    }
  }
}
