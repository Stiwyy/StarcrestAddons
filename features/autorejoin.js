import Settings from "../settings";
function autoRejoin() {
    if (!Settings.enabled && !Settings.autoRejoin) return;
    const rejoinDelay = 60000; // 1 minute
    ChatLib.chat("&aYou were kicked from Skyblock, rejoining in 1 minute...");
    // Delay the rejoin command to prevent immediate rejoin attempts
    setTimeout(() => {
        ChatLib.command("skyblock");
        ChatLib.chat("&aRejoining Skyblock...");
    }, rejoinDelay);

}
register("chat", () => {
    autoRejoin();
}).setCriteria("You were kicked while joining that server!");


