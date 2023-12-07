const { OpenAI } = require('openai')
exports.run = {
   async: async (m, {
      client,
      body,
      Func
   }) => {
      try {
          if (/(Errin|errin)/.test(body)) {
              	client.sendReact(m.chat, '🕒', m.key)
               const openai = new OpenAI({
                 	apiKey: process.env.OPENAI_API_KEY
               })
               const json = await openai.chat.completions.create({
                  messages: [
                     {
                        'role': 'system',
                        'content': require('fs').readFileSync('./media/prompt1.txt', 'utf-8')
                     },
                     {
                        'role': 'user',
                        'content': body,
                     }
                  ],
                  model: 'gpt-3.5-turbo',
                  temperature: 0.7,
                  top_p: 1,
                  max_tokens: 300
               })
               try{
                  //let speach = `https://api.yanzbotz.my.id/api/tts/Gadis?query=${encodeURIComponent(json.choices[0].message.content.trim())}`
                  let speach = `https://api.yanzbotz.my.id/api/tts/ttstiktok?text=${encodeURIComponent(json.choices[0].message.content.trim())}&id=id_001`
                  client.reply(m.chat, json.choices[0].message.content.trim(), m)
                  client.sendFile(m.chat, await Func.fetchBuffer(speach), 'audio.mp3', '', m, {
                     ptt: true
                  })
               } catch (e) {
                  console.log(e)
                  return client.reply(m.chat, Func.texted('bold', `🚩 EROR.`), m)
               }
         }
      } catch (e) {
         console.log(e)
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true,
   cache: true,
   location: __filename
}