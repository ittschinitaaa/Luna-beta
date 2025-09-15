import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"

global.botNumber = ""

global.owner = ["923256941884"],

global.botname = '⏤͟͞ू⃪ 𝐋𝕌𝐍𝔸 𝐁𝕆𝐓 𑁯★ᰍ'
global.namebot = '⏤͟͞ू⃪ 𝐋𝕌𝐍𝔸 𝐁𝕆𝐓 𑁯★ᰍ'
global.bot = '⏤͟͟͞͞𝐋ᥙᥒᥲ 𝐁ot ★'
global.packname = '⏤͟͞ू⃪ 𝐋𝕌𝐍𝔸 𝐁𝕆𝐓 𑁯★ᰍ'
global.wm = '⏤͟͞ू⃪ 𝐋𝕌𝐍𝔸 𝐁𝕆𝐓 𑁯★ᰍ'
global.author = '🔥 𝕮𝖍𝖎𝖓𝖆'
global.dev = '© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʜɪɴᴀ 🔥'

global.banner = 'https://files.catbox.moe/if757e.jpg'
global.icon = 'https://files.catbox.moe/57djkj.jpg'
global.currency = 'StarCoins'
global.sessions = 'sessions/session-bot'
global.jadi = 'sessions/session-sub'

global.api = { 
url: 'https://api.stellarwa.xyz',
key: 'Diamond'
}

global.my = {
  ch: '120363420979328566@newsletter',
  name: '⏤͟͞ू⃪𝐁𝕃𝐔𝔼 𝐋𝕆𝐂𝕂 𝐂𝕃𝐔𝔹 𑁯🩵ᰍ',

  ch2: '120363402839382986@newsletter', 
  name2: '⌯ ᤳ݄፞🌔꯭᳑ 𝐋𝕌𝐍𝔸 𝐁𝕆𝐓 ᵒᶠ⵿ᶦᶜᶦ⵿ᵃˡ',

  ch3: '120363419164978167@newsletter', 
  name3: '⏤͟͞ू⃪𝐋𝕌𝐍𝔸 - 𝐓𝔼𝐒𝕋 ᵒᶠ⵿ᶦᶜᶦ⵿ᵃˡ 🌔',
}

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright(`Update "${file}"`))
  import(`${file}?update=${Date.now()}`)
})
