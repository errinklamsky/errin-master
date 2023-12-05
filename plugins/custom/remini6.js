exports.run = {
  usage: ['reminiv6'],
  use: 'reply photo',
  category: 'utilities',
  async: async (m, {
     client,
     Func,
     Scraper
  }) => {
     try {
      if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
         let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
         let q = m.quoted ? m.quoted.message[type] : m.msg
         if (/image/.test(type)) {
            client.sendReact(m.chat, '🕒', m.key)
            let img = await client.downloadMediaMessage(q)
            let image = await Scraper.uploadImageV2(img)
            const json = await Func.fetchJson(`https://aemt.me/remini?url=${image.data.url}&resolusi=10`)
            let result = json.url
            let caption = json.time_taken
            client.sendFile(m.chat, result.url, 'image.png', caption, m)
         } else client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
      } else {
        let q = m.quoted ? m.quoted : m
         let mime = (q.msg || q).mimetype || ''
         if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
         if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let img = await q.download()
         let image = await Scraper.uploadImageV2(img)
         const json = await Func.fetchJson(`https://aemt.me/remini?url=${image.data.url}&resolusi=10`)
         let result = json.url
         let caption = json.time_taken
         client.sendFile(m.chat, result.url, 'image.png', caption, m)
      }
   } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m)
   }
  },
  error: false,
  owner: true,
  limit: true,
  cache: true,
  location: __filename
}