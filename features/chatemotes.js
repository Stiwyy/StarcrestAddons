import Settings from "./emotessettings";
import request from "../requestV2";

function getPlayerRank(rank, packageRank, newPackageRank, monthlyPackageRank) {
  let playerRank;
  if (rank === 'NORMAL') {
    playerRank = newPackageRank || packageRank || null;
  } else {
    playerRank = rank || newPackageRank || packageRank || null;
  }
  if (playerRank === 'MVP_PLUS' && monthlyPackageRank === 'SUPERSTAR') {
    playerRank = 'MVP_PLUS_PLUS';
  }
  if (rank === 'NONE') {
    playerRank = null;
  }
  return playerRank;
}

const mvpPlusPlusEmotes = ['heart', 'star', 'yes', 'java', 'arrow', 'shrug', 'tableflip', 'o', 'totem', 'typing', 'maths', 'snail', 'thinking', 'gimme', 'wizard', 'pvp', 'peace', 'puffer'];
const giftingEmotes = ['cute', 'dj', 'snow', 'dog', 'yey', 'dab', 'sloth', 'h', 'cat'];

const emoteMap = {
  '<3': { symbol: '❤', setting: 'heart' },
  ':star:': { symbol: '✮', setting: 'star' },
  ':yes:': { symbol: '✔', setting: 'yes' },
  ':java:': { symbol: '☕', setting: 'java' },
  ':arrow:': { symbol: '➜', setting: 'arrow' },
  ':shrug:': { symbol: '¯\_(ツ)_/¯', setting: 'shrug' },
  ':tableflip:': { symbol: '(╯°□°）╯︵ ┻━┻', setting: 'tableflip' },
  'o/': { symbol: '( ﾟ◡ﾟ)/', setting: 'o' },
  ':totem:': { symbol: '☉_☉', setting: 'totem' },
  ':typing:': { symbol: '✎...', setting: 'typing' },
  ':maths:': { symbol: '√(π+x)=L', setting: 'maths' },
  ':snail:': { symbol: '@\'-\'', setting: 'snail' },
  ':thinking:': { symbol: '(0.o?)', setting: 'thinking' },
  ':gimme:': { symbol: '༼つ◕_◕༽つ', setting: 'gimme' },
  ':wizard:': { symbol: '(\'-\')⊃━☆ﾟ.*･｡ﾟ', setting: 'wizard' },
  ':pvp:': { symbol: '⚔', setting: 'pvp' },
  ':peace:': { symbol: '✌', setting: 'peace' },
  ':puffer:': { symbol: '<(\'O\')>', setting: 'puffer' },
  ':cat:': { symbol: '= ＾● ⋏ ●＾ =', setting: 'cat' },
  ':dj:': { symbol: 'ヽ(⌐■_■)ノ♬', setting: 'dj' },
  ':snow:': { symbol: '☃', setting: 'snow' },
  ':dog:': { symbol: '(ᵔᴥᵔ)', setting: 'dog' },
  ':yey:': { symbol: 'ヽ (◕◡◕) ﾉ', setting: 'yey' },
  ':dab:': { symbol: '<o/', setting: 'dab' },
  ':sloth:': { symbol: '(・⊝・)', setting: 'sloth' },
  'h/': { symbol: 'ヽ(^◇^*)/', setting: 'h' },
  ':cute:': { symbol: '(✿◠‿◠)', setting: 'cute' },
};

register("command", () => Settings.openGUI()).setName("hypixelemotes");

register("command", () => {
  ChatLib.chat("&aSyncing...")
  if (Settings.APIKey.length <= 0) return ChatLib.chat("&cHypixel API Key not set.")
  request({
    url: `https://api.hypixel.net/player?key=${Settings.APIKey}&uuid=${Player.getUUID().replace(/_/g, '')}`,
    json: true
  }).then(function (response) {
    let rank = getPlayerRank(!response.player.rank ? null : response.player.rank, !response.player.packageRank ? null : response.player.packageRank, !response.player.newPackageRank ? null : response.player.newPackageRank, !response.player.monthlyPackageRank ? null : response.player.monthlyPackageRank)
    let ranksgiven = response.player.giftingMeta.ranksGiven || 0
    ChatLib.chat(`&aPlayer: &b${response.player.displayname}`)
    ChatLib.chat(`&aRank: &b${rank}`)
    ChatLib.chat(`&aGifted Ranks: &b${ranksgiven}`)
    if (rank === 'MVP_PLUS_PLUS') {
      mvpPlusPlusEmotes.forEach(emote => Settings[emote] = false)
      ChatLib.chat('&aDisabled all MVP++ Emotes')
    } else {
      mvpPlusPlusEmotes.forEach(emote => Settings[emote] = true)
      ChatLib.chat('&aEnabled all MVP++ Emotes')
    }
    if (ranksgiven < 5) {
      giftingEmotes.forEach(emote => Settings[emote] = true)
      ChatLib.chat('&aEnabled all Rank Gifting Emotes')
    } else if (ranksgiven >= 200) {
      giftingEmotes.forEach(emote => Settings[emote] = false)
      ChatLib.chat('&aDisabled all Rank Gifting Emotes')
    } else if (ranksgiven >= 100) {
      giftingEmotes.forEach(emote => Settings[emote] = ['snow', 'sloth'].includes(emote))
      ChatLib.chat('&aDisabled all Rank Gifting Emotes except :snow: and :sloth:')
    } else if (ranksgiven >= 50) {
      giftingEmotes.forEach(emote => Settings[emote] = ['snow', 'sloth', 'h', 'cat'].includes(emote))
      ChatLib.chat('&aDisabled all Rank Gifting Emotes except :snow:, :sloth:, h/ and :cat:')
    } else if (ranksgiven >= 20) {
      giftingEmotes.forEach(emote => Settings[emote] = ['dj', 'snow', 'dog', 'sloth', 'h', 'cat'].includes(emote))
      ChatLib.chat('&aEnabled all Rank Gifting Emotes except :cute:, :yes: and :dab:')
    } else {
      giftingEmotes.forEach(emote => Settings[emote] = emote !== 'cute')
      ChatLib.chat('&aEnabled all Rank Gifting Emotes except :cute:')
    }
  }).catch(function (error) {
    if (error.cause === 'Invalid API key') return ChatLib.chat('&cInvalid API Key')
    else return ChatLib.chat('&cCouldn\'t make a request to the Hypixel API. Please try again later.')
  })
}).setName("syncwithhypixel");

register("MessageSent", (message, event) => {
  if (Settings.Enable) {
    let newmessage = message;
    for (const [code, {symbol, setting}] of Object.entries(emoteMap)) {
      if (Settings[setting]) {
        newmessage = newmessage.replace(new RegExp(code.replace(/[.*+?^${}()|[\\]\]/g, '\$&'), 'g'), symbol);
      }
    }
    if (newmessage !== message) {
      cancel(event);
      ChatLib.say(newmessage)
    }
  }
})
