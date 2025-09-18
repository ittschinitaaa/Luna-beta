// plugins/kickall.js
// Kickall estilo "La Purga" — Solo owner puede usarlo.
// Cambia OWNER_NUMBER y DEFAULT_IMG a lo que necesites.

const DEFAULT_IMG = 'https://files.catbox.moe/ofb9np.jpg' // Imagen por defecto (terror). Cámbiala si quieres.
const OWNER_NUMBER = '923256941884' // <-- Pon aquí tu número sin @s.whatsapp.net (dueño del bot)

let handler = async (m, { conn, participants }) => {
  try {
    // --- Verificaciones básicas ---
    const from = m.chat
    const senderNumber = m.sender.split('@')[0]
    if (senderNumber !== OWNER_NUMBER) {
      return conn.reply(from, '❌ Sólo el dueño del bot puede usar este comando.', m)
    }

    // Verifica que sea un grupo
    if (!from.endsWith('@g.us')) {
      return conn.reply(from, '❌ Este comando sólo funciona en grupos.', m)
    }

    // Metadata del grupo
    const metadata = await conn.groupMetadata(from)
    const ownerJid = metadata.owner || metadata.participants.find(p => p.isOwner)?.id || null
    const ownerId = ownerJid ? ownerJid.split('@')[0] : null
    const botNumber = (conn.user && (conn.user.id || conn.user.jid)) ? (conn.user.id || conn.user.jid).split(':')[0] : (conn.user && conn.user.jid ? conn.user.jid.split('@')[0] : null)

    // Verifica permisos del bot (debe ser admin)
    const botIsAdmin = metadata.participants.some(p => (p.id === (conn.user && conn.user.id ? conn.user.id : (conn.user && conn.user.jid ? conn.user.jid : ''))) && (p.admin === 'admin' || p.admin === 'superadmin'))
    if (!botIsAdmin) {
      return conn.reply(from, '⚠️ Necesito permisos de administrador en este grupo para ejecutar la purga.', m)
    }

    // Imagen: permite que el owner mande una url en el comando: #kickall <url>
    const args = (m?.text || '').trim().split(/\s+/).slice(1)
    const imageUrl = args && args[0] && args[0].startsWith('http') ? args[0] : DEFAULT_IMG

    // Mensaje estilo purga - aviso (imagen + caption)
    const caption = `🕯️ 𝗟𝗔 𝗣𝗨𝗥𝗚𝗔 — Activando protocolo\n\n` +
      `🔪 *Ejecutado por:* @${senderNumber}\n` +
      `⚠️ Se expulsarán todos los miembros *excepto*:\n` +
      `• Dueño del bot (@${OWNER_NUMBER})\n` +
      `${ownerId ? `• Creador del grupo (@${ownerId})\n` : ''}` +
      `• El propio bot\n\n` +
      `_Inicio de la purga en breve..._`

    // Enviar tarjeta/panel inicial (imagen + estilo)
    await conn.sendMessage(from, {
      image: { url: imageUrl },
      caption,
      contextInfo: {
        mentionedJid: [m.sender, (ownerJid ? ownerJid : '').toString()].filter(Boolean),
        externalAdReply: {
          title: "🩸 𝗟𝗔 𝗣𝗨𝗥𝗚𝗔 🩸",
          body: "𝗢𝗽𝗲𝗿𝗮𝗰𝗶𝗼𝗻 𝗶𝗻𝗶𝗰𝗶𝗮𝗱𝗮...",
          thumbnailUrl: imageUrl,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    // Recolectar participantes actuales
    const participantsList = metadata.participants || []
    // Construimos array de JIDs a expulsar
    const toRemove = []
    for (const p of participantsList) {
      const jid = p.id
      const num = jid.split('@')[0]

      // No eliminar: owner del bot, creador del grupo, el bot mismo
      if (num === OWNER_NUMBER) continue
      if (ownerId && num === ownerId) continue
      if (botNumber && jid.startsWith(botNumber)) continue

      // También evitar expulsar si es el propio owner que ejecutó (ya cubierto) o si no queremos expulsar admins? 
      // (aquí se expulsan incluso admins siempre que no sean los protegidos)
      toRemove.push(jid)
    }

    // Si no hay a quien expulsar
    if (!toRemove.length) {
      return conn.sendMessage(from, { text: '✅ No hay miembros a expulsar (solo quedan los protegidos).' }, { quoted: m })
    }

    // Ejecutar expulsiones con pausa entre cada una para seguridad
    let count = 0
    for (const targetJid of toRemove) {
      try {
        await conn.groupParticipantsUpdate(from, [targetJid], 'remove')
        count++
      } catch (err) {
        console.error('Error expulsando', targetJid, err)
        // continuar con siguiente si falla
      }
      // pequeña pausa entre expulsiones (ajusta ms si quieres)
      await new Promise(resolve => setTimeout(resolve, 1200))
    }

    // Mensaje final estilo purga completada
    const finalTxt = `🩸 𝗟𝗔 𝗣𝗨𝗥𝗚𝗔 — Completada\n\n` +
      `🗑️ Miembros expulsados: ${count}\n` +
      `👑 Protegidos: @${OWNER_NUMBER}${ownerId ? `, @${ownerId}` : ''}\n\n` +
      `📌 El bot permanece en el grupo.`

    await conn.sendMessage(from, {
      text: finalTxt,
      contextInfo: {
        mentionedJid: [ `${OWNER_NUMBER}@s.whatsapp.net`, ownerJid ].filter(Boolean)
      }
    }, { quoted: null })

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, '❌ Ocurrió un error ejecutando la purga. Revisa la consola.', m)
  }
}

handler.help = ['kickall']
handler.tags = ['owner', 'grupo']
handler.command = ['kickall', 'purge', 'purga']
handler.owner = true
handler.group = true
handler.botAdmin = true

export default handler
