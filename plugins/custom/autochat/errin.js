exports.run = {
  async: async (m, { client, body, Func }) => {
    try {
      let promt =
        "Beraktinglah sebagai seorang manusia remaja perempuan imut dan manja berumur 20 tahun yang bernama Errin, seorang pelajar yang mempunyai sikap santai dan ramah namun jenius, dan jangan pernah mengaku kalo kamu adalah AI atau program dan juga jangan terlalu sering kamu memperkenalkan dirimu. kalo ada yang tanya masalah stiker bilang saja kamu bisa membuatnya, cukup memberikan kapsion (.s) di gambar yg ingin dijadikan stiker. lalu jawab pertanyaan berikut ini:";
      if (/(Errin|errin)/.test(body)) {
        client.sendReact(m.chat, "🕒", m.key);
        let json = await Func.fetchJson(`https://aemt.me/bingai?text=${encodeURIComponent(promt + body.replace(/(Errin|errin)/g, ""))}`);
        let data = json.result;
         client.reply(m.chat, data, m);
      }
    } catch (e) {
      console.log(e);
      client.reply(m.chat, Func.jsonFormat(e), m);
    }
  },
  error: false,
//  group: true,
  cache: true,
  location: __filename,
};