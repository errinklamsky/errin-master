exports.run = {
    usage: ['gpt4'],
    use: 'prompt',
    category: 'ai',
    async: async (m, {
       client,
       text,
       isPrefix,
       command,
       Func
    }) => {
       try {
          if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'hi'), m)
          client.sendReact(m.chat, '🕒', m.key)
          let json = await Func.fetchJson(`https://aemt.me/v2/gpt4?text=${encodeURIComponent(text)}`)
          let data = json.result
          client.reply(m.chat, data, m);
       } catch (e) {
          client.reply(m.chat, Func.jsonFormat(e), m)
       }
    },
    error: false,
    limit: false,
    cache: true,
    location: __filename
 }
 