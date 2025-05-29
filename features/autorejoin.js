import Settings from "../settings";
function autoRejoin() {
    if (!Settings.enabled || !Settings.autoRejoin) return;
    const rejoinDelay = 60000; // 1 minute
        
    setTimeout(() => {
        ChatLib.command("skyblock");
        ChatLib.chat("&aRejoining Skyblock...");
    }, rejoinDelay);

}
register("chat", () => {
    autoRejoin();
}).setCriteria("A kick occurred in your connection, so you were put in the SkyBlock lobby!");


