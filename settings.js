import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"

global.botNumber = ""

global.owner = ["923256941884"]

global.botname = '⏤͟͞ू⃪ 𝐋𝕌𝐍𝔸 𝐁𝕆𝐓 𑁯★ᰍ'
global.namebot = '⏤͟͞ू⃪ 𝐋𝕌𝐍𝔸 𝐁𝕆𝐓 𑁯★ᰍ'
global.bot = '⏤͟͟͞͞𝐋ᥙᥒᥲ 𝐁ot ★'
global.packname = '⏤͟͞ू⃪ 𝐋𝕌𝐍𝔸 𝐁𝕆𝐓 𑁯★ᰍ'
global.wm = '⏤͟͞ू⃪ 𝐋𝕌𝐍𝔸 𝐁𝕆𝐓 𑁯★ᰍ'
global.author = '🔥 𝕮𝖍𝖎𝖓𝖆'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ ᥴһіᥒᥲ.'

global.banner = 'https://stellarwa.xyz/files/1757377941018.jpeg'
global.icon = 'https://stellarwa.xyz/files/1757378468505.jpeg'
global.currency = 'CryptoCoins'
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
  name2: '⏤͟͞ू⃪ℂ𝐇𝕀𝐍𝔸 𝐎𝔽𝐈ℂ𝐈𝔸𝐋 .୧𝅄🔥 ִ  .',

  ch3: '120363419164978167@newsletter', 
  name3: '⏤͟͞ू⃪𝐂ℍ𝐈ℕ𝐀 - 𝐓𝔼𝐒𝕋 𑁯🇨🇳ᰍ',
}

const file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright(`Update "${file}"`))
  import(`${file}?update=${Date.now()}`)
})
