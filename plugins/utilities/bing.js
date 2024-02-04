exports.run = {
   usage: ['bing'],
   use: 'prompt',
<<<<<<< HEAD
   category: 'ai',
=======
   category: 'utilities',
>>>>>>> c2d44cab25bf04884e1d11f6dc73bfd5090923ad
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      try {
<<<<<<< HEAD
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'hi'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Api.neoxr('/bing-chat', {
            q: text
         })
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         client.reply(m.chat, json.data.message, m)
=======
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'apa itu kucing'), m)
            client.sendReact(m.chat, '🕒', m.key)
            const json = await Api.neoxr('/bing-chat', {
               q: text
            })
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            client.reply(m.chat, json.data.message, m)
>>>>>>> c2d44cab25bf04884e1d11f6dc73bfd5090923ad
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
<<<<<<< HEAD
}
=======
}
>>>>>>> c2d44cab25bf04884e1d11f6dc73bfd5090923ad
