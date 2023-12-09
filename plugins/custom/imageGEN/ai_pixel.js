exports.run = {
   usage: ['ai-pixel'],
   use: 'prompt',
   category: 'img-gen',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'long hair'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Api.neoxr('/ai-pixel', {
            q: text
         })
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         client.sendFile(m.chat, json.data.url, '', ``, m)
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}
