exports.run = {
   usage: ['hidetag'],
   use: 'text',
   category: 'admin tools',
   async: async (m, {
      client,
      text,
      participants
   }) => {
      let users = participants.map(u => u.id)
      await client.reply(m.chat, text, null, {
         mentions: users
      })
   },
   limit: true,
   admin: false,
   premium: true,
   group: true
}