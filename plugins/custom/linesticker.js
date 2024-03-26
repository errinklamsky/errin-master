exports.run = {
   usage: ['stickerline'],
   hidden: ['sline', 'stline', 'stl'],
   use: 'link sticker',
   category: 'converter',
   async: async (m, {
      client,
      args,
      text,
      isPrefix,
      command,
      Func
   }) => {
      try {
         let old = new Date()
         let exif = global.db.setting
         if (!text && !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://store.line.me/stickershop/product/9801/en (link : https://store.line.me/en)'), m)
         if (text) {
             if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://store.line.me/stickershop/product/9801/en (link : https://store.line.me/en)'), m)
             if (!args[0].match('line.me')) return client.reply(m.chat, Func.example(isPrefix, command, 'https://store.line.me/stickershop/product/9801/en (link : https://store.line.me/en)'), m)
             client.sendReact(m.chat, '🕒', m.key)
             const json = await Api.neoxr('/linesticker', {
                url: Func.ttFixed(args[0])
             })
               for (let i = 0; i < json.data.sticker_url.length; i++) {
                   client.sendSticker(m.chat, await Func.fetchBuffer(json.data.sticker_url[i]), m, {
                       packname: exif.sk_pack,
                       author: exif.sk_author
                   })
               await Func.delay(2000)
               }           
           await client.reply(m.chat, Func.texted('bold', `✅ Done, sticker author : ${json.data.author}\n Title : ${json.data.title}\n\n Fetching in : ${((new Date - old) * 1)} ms`), m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
};