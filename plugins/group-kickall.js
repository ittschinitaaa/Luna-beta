import fs from 'fs'

let handler = async (m, { conn, participants, command }) => {
  try {
    // Verificar que el bot sea admin
    const groupMetadata = await conn.groupMetadata(m.chat)
    const botNumber = conn.user.jid
    const botAdmin = groupMetadata.participants.find(p => p.id == botNumber)?.admin
    if (!botAdmin) return m.reply('⚠️ *Necesito permisos de administrador para ejecutar la purga.*')

    // Verificar que sea el dueño del bot
    let isOwner = global.owner.map(([num]) => num).includes(m.sender.split('@')[0])
    if (!isOwner) return m.reply('⛔ *Solo el dueño del bot puede iniciar la PURGA.*')

    // Imagen de terror para la purga
    let media = 'https://files.catbox.moe/ofb9np.jpg' // puedes cambiar por otra más aterradora

    // Mensaje de inicio de purga
    await conn.sendMessage(m.chat, {
      image: { url: media },
      caption: `🩸 *𝐋𝐀 𝐏𝐔𝐑𝐆𝐀 𝐇𝐀 𝐈𝐍𝐈𝐂𝐈𝐀𝐃𝐎* 🩸

> Ningún alma inocente quedará en este grupo...
> Los débiles serán expulsados.
> Solo los elegidos sobrevivirán esta noche. 🌑`
    }, { quoted: m })

    // Expulsar a todos excepto el owner y el bot
    for (let user of participants) {
      if (
        user.id.endsWith('@s.whatsapp.net') &&
        user.id !== m.sender && // no expulsar al dueño
        user.id !== botNumber // no expulsar al bot
      ) {
        try {
          await conn.groupParticipantsUpdate(m.chat, [user.id], 'remove')
        } catch (e) {
          console.log(`No se pudo expulsar a ${user.id}`)
        }
      }
    }

    await conn.sendMessage(m.chat, { text: '☠️ *La purga ha finalizado... los sobrevivientes han sido marcados.*' }, { quoted: m })
  } catch (e) {
    console.error(e)
    m.reply('⚠️ Ocurrió un error durante la purga.')
  }
}

handler.command = /^kickall$/i
handler.group = true
handler.botAdmin = true
handler.owner = true

export default handler
