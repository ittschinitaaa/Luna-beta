const handler = async (m, { conn }) => {
  try {
    const groupMetadata = await conn.groupMetadata(m.chat)
    const participantes = groupMetadata.participants.map(u => u.id).filter(u => u !== conn.user.jid && u !== m.sender)

    if (!participantes.length) return m.reply('🕸 No hay a quién expulsar.')

    // Imagen temática de La Purga
    const purgeImage = 'https://files.catbox.moe/ofb9np.jpg' // Puedes cambiar el link por otra imagen más tenebrosa

    const mensaje = `🩸 *LA PURGA HA COMENZADO* 🩸\n
⚠️ Todos los pecadores serán expulsados del grupo ⚠️\n
🌙 Grupo: ${groupMetadata.subject}
👥 Miembros a purgar: *${participantes.length}*\n
⏳ Que la luna decida su destino...`

    // Enviar portada de la purga
    await conn.sendMessage(m.chat, { 
      image: { url: purgeImage }, 
      caption: mensaje 
    }, { quoted: m })

    // Expulsar a todos (uno por uno con delay para dramatismo)
    for (let user of participantes) {
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
      await conn.reply(m.chat, `🩸 *@${user.split('@')[0]}* ha sido purgado.`, m, { mentions: [user] })
      await new Promise(resolve => setTimeout(resolve, 1500)) // espera 1.5 seg entre cada kick
    }

    await conn.reply(m.chat, '🌙 *La purga ha terminado. Que reine la calma...*', m)
  } catch (e) {
    await m.reply('🌾 Error al ejecutar la Purga.')
  }
}

handler.help = ['kickall']
handler.tags = ['grupo']
handler.command = ['kickall', 'purgar']
handler.admin = true
handler.botAdmin = true
handler.owner = true // 🔒 Solo el owner del bot puede usarlo

export default handler
