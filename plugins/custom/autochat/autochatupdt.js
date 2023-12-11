const { OpenAI } = require('openai')
const { tmpdir } = require('os')
const fs = require('fs')
const path = require('path')

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
                        'content': require('fs').readFileSync('./media/prompt.txt', 'utf-8')
                     },
                     {
                        'role': 'user',
                        'content': body,
                     }
                  ],
                  model: 'gpt-3.5-turbo',
                  temperature: 0.7,
                  top_p: 1,
                  max_tokens: 250
               })
               client.reply(m.chat, json.choices[0].message.content.trim(), m)
               try {
                  const filePath = path.join(tmpdir(), Func.filename('mp3'))
                  const mp3 = await openai.audio.speech.create({
                     // model tts-1-hd, tts-1
                     model: "tts-1-hd",
                     // voice model alloy, echo, fable, onyx, nova, and shimmer
                     voice: "nova",
                     language: "id",
                     input: json.choices[0].message.content.trim(),
                  });
                  const buffer = Buffer.from(await mp3.arrayBuffer());
                  await fs.promises.writeFile(filePath, buffer);
                  client.sendFile(m.chat, await Func.fetchBuffer(filePath), 'audio.mp3', '', m, {
                     ptt: true
                  })
                  fs.unlinkSync(filePath)
               } catch (e) {
                  console.log(e)
                  return client.reply(m.chat, Func.jsonFormat(e), m)
               }
         }
      } catch (e) {
         console.log(e)
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   group: true,
   location: __filename
}