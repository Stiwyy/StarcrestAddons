import Settings from "./settings";
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
