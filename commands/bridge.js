import request from "requestV2";
import Settings from "../settings";

register("command", (...args) => {
    if (!args || args.length === 0) {
        Settings.openGUI();
        return;
    }
    const playerName = args[1];
    const subCommand = args[0].toLowerCase(); 

    switch (subCommand) {
        case "networth":
            if (!playerName) {
                ChatLib.chat("§cUsage: /bridge networth <username>");
                return;
            }
            
            request({
                url: "https://soopy.dev/api/v2/leaderboard/networth/user/" + playerName,
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0"
                }
            }
        ).then(soopyResponse => {
                const playerData = JSON.parse(soopyResponse)
                const networth = playerData.data?.data?.userData?.networth;
                ChatLib.chat("§aNet Worth of " + playerName + ": §6" + formatNumber(networth.toFixed(0)) + " Coins");
            }
            );
            break;
            
        case "weight":
            if (!playerName) {
                ChatLib.chat("§cUsage: /bridge weight <username>");
                return;
            }
            
            request({
                url: "https://soopy.dev/api/v2/leaderboard/networth/user/" + playerName,
                headers: {
                    "Content-Type": "application/json",
                    "User-Agent": "Mozilla/5.0"
                }
            }
        ).then(soopyResponse => {
                const playerData = JSON.parse(soopyResponse)
                const weight = playerData.data?.data?.userData?.weight;
                ChatLib.chat("§aWeight of " + playerName + ": §6" + formatNumber(weight.toFixed(0)));
            }
            );
            break;

        case "mayor":
    request({
        url: "https://soopy.dev/api/v2/mayor/",
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0"
        }
    }).then(soopyResponse => {
        const mayorData = JSON.parse(soopyResponse);
        
        if (!mayorData.success || !mayorData.data?.mayor) {
            ChatLib.chat("§cCould not fetch mayor data. Try again later.");
            return;
        }

        const mayor = mayorData.data.mayor.name;
        const perks = mayorData.data.mayor.perks;
        const perkNames = perks.map(perk => `§7${perk.name}`).join("\n");

        ChatLib.chat(["§aCurrent Mayor: §6" + mayor, "§aPerks:", perkNames, `§7Last updated: §e${new Date(mayorData.data.lastUpdated).toLocaleString()}`].join("\n"));
        }).catch(error => {
            ChatLib.chat("§cError fetching mayor data: " + error);
        });
        break;

        case "commands":
        case "commandslist":
        case "help":
            ChatLib.chat([
                "§3- /bridge §7»"+ "§8 Main command.",
                "§3- /bridge networth <player> §7»" +"§8 Shows player networth.",
                "§3- /bridge weight <player> §7»" +"§8 Shows player weight.",
                "§3- /bridge mayor §7»" +"§8 Shows current mayor and their perks.",
                "§3- /bridge commands §7»" +"§8 Shows this help menu.",
                "§3- /star help §7»" +"§8 Prints out a list of commands you can use.",
                "§3- /skibidi §7»" + "§8 Prints a random brainrot word." 
            ].join("\n"));
            break;
        
        default:
            ChatLib.chat("§cUnknown command. Use §a/bridge commands §cfor help");
            break;
    }
}).setName("bridge");

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}