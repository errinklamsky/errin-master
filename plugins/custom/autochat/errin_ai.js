const fs = require('fs');

exports.run = {
  async: async (m, { client, body, Func }) => {
    try {
      // ID bot yang spesifik
      const botId = '6283893900755@s.whatsapp.net';

      // Menentukan apakah pesan yang di-quote adalah pesan dari bot
      const isQuotedFromBot = m.quoted ? m.quoted.sender === botId : false;

      // Mengecek apakah pesan merupakan media (gambar atau stiker)
      const isMedia = m.msg.hasOwnProperty('imageMessage') || m.msg.hasOwnProperty('videoMessage');

      let prompt = fs.readFileSync('./media/personaerrin.txt', 'utf-8');
      let text = ''; // Menyiapkan variabel untuk menyimpan teks yang akan dibahas oleh bot    

      // Cek apakah pesan mengandung kata 'Errin' (tidak peduli dengan huruf besar atau kecil)
      if (/(Errin|errin)/.test(body) || isQuotedFromBot) {
        await client.sendReact(m.chat, "🕒", m.key); // Mengirim reaksi
        // Mengecek apakah body adalah string sebelum menggantikan teks
        if (typeof body === 'string') {
          text = prompt + body.replace(/(Errin|errin)/g, "");
        }
      }

      // Cek apakah pesan yang diterima merupakan media, jika ya, abaikan
      if (isMedia) {
        return;
      }

      // Cek apakah ada pesan yang dikutip
      if (m.quoted && !isMedia) { // tambahkan !isMedia untuk memastikan bahwa pesan yang dikutip bukan media
        let quotedMessage = m.quoted.text || ''; // Ambil teks dari pesan yang dikutip
        // Cek quoted apakah ada kata 'Errin' (tidak peduli dengan huruf besar atau kecil) jika ada, maka tambahkan prompt ke teks yang akan dibahas oleh bot
        if (/(Errin|errin)/.test(quotedMessage)){
          text = prompt + quotedMessage; // Tambahkan teks dari pesan yang dikutip ke teks yang akan dibahas oleh bot
          text += ` ${body}`;
        } else {
          return;
        }
      }

      // Jika teks yang akan dibahas tidak kosong, kirim permintaan ke server untuk mendapatkan balasan
      if (text !== '') {
        await client.sendReact(m.chat, "🕒", m.key); // Mengirim reaksi
        let json = await Func.fetchJson(`https://aemt.me/bard?text=${encodeURIComponent(text)}`);
        let data = json.result;

        //jika data = Request failed 
        if (data === 'Request failed!') {
            const json = await Api.neoxr('/bard', {
                q: text
            })
            client.reply(m.chat, json.data.message, m)
        }else{
        client.reply(m.chat, data, m); // Memberikan balasan
        }
        
      }
    } catch (e) {
      console.log(e);
      client.reply(m.chat, Func.jsonFormat(e), m); // Memberikan balasan jika terjadi kesalahan
    }
  },
  error: false,
  cache: true,
  group: true,
  limit: true,
  location: __filename,
};