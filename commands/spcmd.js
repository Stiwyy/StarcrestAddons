import request from "requestV2";
import Settings from "../settings";

const validCommands = [
  "auctions", "bestiary", "bank", "classaverage", "currdungeon",
  "dojo", "dungeon", "essence", "faction", "guildof", "kuudra",
  "nucleus", "overflowskillaverage", "overflowskills",
  "pet", "rtca", "sblvl", "secrets", "skillaverage", "skills", "nw", "mayor"
];

register("command", (...args) => {
  const subCommand = args[0].toLowerCase();
  const playerName = args[1];

  if (subCommand === "help" || subCommand === "commands" || subCommand === "commandslist") {
    ChatLib.chat("§6[StarCMD] §aAvailable Soopy commands:");
    ChatLib.chat("§7" + validCommands.join(", ")); 
    ChatLib.chat("§eUsage: /star <command> <player>");
    return;
  }

  if (!validCommands.includes(subCommand)) {
    ChatLib.chat("§cUnknown command. Use '/star help' to list available commands.");
    return;
  }
  if (subCommand !== "mayor" && (!playerName || playerName.length < 2)) {
    ChatLib.chat(`§cUsage: /star ${subCommand} <player>`);
    return;
  }

  ChatLib.chat(`§6[SoopyCMD] §7Fetching §a${subCommand} §7for §a${playerName || ""}§7...`);
  let url;
  if (subCommand === "mayor") {
    url = "https://soopy.dev/api/v2/mayor/";
  } else {
    url = `https://soopy.dev/api/soopyv2/botcommand?m=${subCommand}&u=${playerName}`;
  }

  request({
    url: url,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0"
    },
    timeout: 50000
  })
  .then(responseText => {
    try {
      if (subCommand === "mayor") {
        const mayorData = JSON.parse(responseText);
        if (!mayorData.success || !mayorData.data?.mayor) {
          ChatLib.chat("§cCould not fetch mayor data. Try again later.");
          return;
        }
        const mayor = mayorData.data.mayor.name;
        const perks = mayorData.data.mayor.perks.map(p => `§7- ${p.name}`).join("\n");
        const updated = new Date(mayorData.data.lastUpdated).toLocaleString();

        ChatLib.chat([
          `§6§lCurrent Mayor: §e${mayor}`,
          `§a§lPerks:`,
          perks,
          `§7Last updated: §e${updated}`
        ].join("\n"));
      } else {
        ChatLib.chat(`§6[SoopyCMD] §a${responseText}`);
      }
    } catch (e) {
      ChatLib.chat(`§cError parsing response: ${e.message}`);
    }
  })
  .catch(error => {
    ChatLib.chat(`§cError fetching data: ${error}`);
  });

}).setName("star");
