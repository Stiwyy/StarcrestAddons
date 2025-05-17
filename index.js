import Settings from "./settings";
import request from "requestV2";

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

        case "commands":
        case "commandslist":
        case "help":
            ChatLib.chat([
                "§3- /bridge §7»"+ "§8 Main command",
                "§3- /bridge networth <player> §7»" +"§8 Shows player networth",
                "§3- /bridge weight <player> §7»" +"§8 Shows player weight",
                "§3- /bridge commands §7»" +"§8 Shows this help menu"
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


const colorArray = [
    "&4", "&c", "&6", "&e",
    "&2", "&a", "&b", "&3",
    "&1", "&9", "&d", "&5",
    "&f", "&7", "&8", "&0"
];
/*
register("chat", bridgeChat).setCriteria("&r&2Guild > ${*} ${bot} ${*}: &r${player}" + Settings.seperator + " ${msg}&r");
register("chat", bridgeChat).setCriteria("&r&2Guild > ${bot} ${*}: &r${player}" + Settings.seperator + " ${msg}&r");
register("chat", bridgeChat).setCriteria("&r&2Guild > ${*} ${bot}: &r${player}" + Settings.seperator + " ${msg}&r");
register("chat", bridgeChat).setCriteria("&r&2Guild > ${bot}: &r${player}" + Settings.seperator + " ${msg}&r");
*/
function bridgeChat(bot, player, msg, event) {
    if (!Settings.enabled || Settings.botName.toLowerCase() !== ChatLib.removeFormatting(bot).toLowerCase()) return;
    cancel(event);

    let bridgeText = Settings.prefix;
    let bridgeBold = Settings.prefixBold === true ? "&l" : "";
    let discordBold = Settings.userBold === true ? "&l" : "";
    let bridgeColor = colorArray[Settings.bridgeColor];
    let discordColor = colorArray[Settings.userColor];

    let combined = addLinks(
        `ยง2Guild > ${bridgeColor + bridgeBold + bridgeText} ${discordColor + discordBold + player}ยงr: ${msg}`,
        event
    );
    ChatLib.chat(combined);
}

function addLinks(msg, event) {
    let newmsg = new TextComponent(msg.replace("&rhttp", "http"));
    new Message(event).getMessageParts().forEach(part => {
        if (part.clickValue) newmsg.setClick(part.clickAction, part.clickValue);
        if (part.hoverValue) newmsg.setHoverValue(part.hoverValue);
    });
    return newmsg;
}

function dc(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9+/=]/g, "");

    while (i < input.length) {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output += String.fromCharCode(chr1);
        if (enc3 !== 64) {
            output += String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
            output += String.fromCharCode(chr3);
        }
    }
    return output;
}

register("chat", (...args) => {
    if (!Settings.enabled) return;
    let event = args[args.length - 1];
    let decryptedLink = dc(args[2]);
    let player = args[1];
    cancel(event);
    let formattedMessage = ChatLib.addColor(`&2Guild > &a[VIP] MAChatbridge &6[EQUITE] &f${player} » ${decryptedLink}`);
    ChatLib.chat(formattedMessage);
}).setCriteria("&r&2Guild > ${*} ${bot} ${*}: &r${player}" + Settings.seperator + " [Image] ${msg}&r");

const brainRot = [
    "skibidi", "skibidi toilet", "gyatt", "mewing", "mew", "rizz", "rizzing", "rizzler",
    "on skibidi", "sigma", "what the sigma", "Ohio", "bussin'", "cook", "cooking",
    "let him/her cook", "baddie", "skibidi rizz", "fanum tax", "fanum taxing", "drake",
    "nonchalant dread head", "aura", "grimace shake", "edging", "edge", "goon", "gooning",
    "looks maxing", "alpha", "griddy", "chris tyson", "diddy", "imagine if ninja got a low taper fade",
    "skibidi gyatt rizz only in ohio", "duke dennis", "did you pray today", "livvy dunne rizzing up baby gronk",
    "sussy imposter", "pibby glitch in real life", "sigma alpha omega male grindset", "andrew tate",
    "goon cave", "freddy fazbear", "colleen ballinger", "smurf cat vs strawberry elephant",
    "blud dawg shmlawg", "ishowspeed", "a whole bunch of turbulence", "ambatukam",
    "bro really thinks he's carti", "literally hitting the griddy the ocky way", "kai cenat",
    "fanum tax", "garten of banban", "no edging in class", "not the mosquito again",
    "bussing", "axel in harlem", "whopper whopper whopper whopper", "1 2 buckle my shoe",
    "goofy ahh", "aiden ross", "sin city", "monday left me broken",
    "quirked up white boy busting it down sexual style", "goated with the sauce", "john pork",
    "grimace shake", "kiki do you love me", "huggy wuggy", "nathaniel b", "lightskin stare",
    "biggest bird", "omar the referee", "amogus", "uncanny", "wholesome reddit", "chungus",
    "keanu reeves", "pizza tower", "zesty", "poggers", "kumalala savesta", "quandale dingle",
    "glizzy", "rose toy", "ankha zone", "thug shaker", "morbin time", "dj khaled",
    "sisyphus", "oceangate", "shadow wizard money gang", "ayo the pizza here",
    "PLUH", "nair butthole waxing", "t-pose", "ugandan knuckles",
    "family guy funny moments compilation with subway surfers gameplay at the bottom",
    "nickeh30", "ratio", "uwu", "delulu", "opium bird", "cg5", "mewing",
    "fortnite battle pass", "all my fellas", "gta 6", "backrooms", "gigachad",
    "based", "cringe", "kino", "redpilled", "no nut november", "pokénut november",
    "foot fetish", "F in the chat", "i love lean", "looksmaxxing", "gassy",
    "social credit", "bing chilling", "xbox live", "mrbeast", "kid named finger",
    "better caul saul", "i am a surgeon", "hit or miss i guess they never miss huh",
    "i like ya cut g", "ice spice", "gooning", "fr", "we go gym", "kevin james",
    "josh hutcherson", "coffin of andy and leyley", "metal pipe falling"
];
register("command", () => {
    if (!Settings.enabled) return;
    const randomBrainrot = brainRot[Math.floor(Math.random() * brainRot.length)];
    ChatLib.chat(randomBrainrot);
}).setName("skibidi");

/*
register("chat", function(message) {
    const randomBrainrot = brainRot[Math.floor(Math.random() * brainRot.length)];
    //Client.showTitle(randomWord, "&7", 0, 35, 15);
    ChatLib.chat(randomBrainrot);
}).setCriteria("&r&8[&r&5392&r&8]${*}");
*/