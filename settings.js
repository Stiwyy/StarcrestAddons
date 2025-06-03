import {@Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @CheckboxProperty, @SelectorProperty, @SliderProperty} from '../Vigilance/index';


@Vigilant("StarcrestAddons", "Settings", {
    getCategoryComparator: () => (a) => {
        const categories = ['General', 'Mask Timer', 'Dungeons'];
        return categories.indexOf(a.name);
    }
})
class Settings {

    // General Settings
    @SwitchProperty({
        name: "Enabled",
        description: "Toggle the module",
        category: "General",
    })
    enabled = true;

    @TextProperty({
        name: "Bot Name",
        description: "Input the IGN of your guild bridge bot",
        category: "General",
        placeholder: "IGN Here"
    })
    botName = "";

    @TextProperty({
        name: "Seperator",
        description: "The string that your guild uses to seperate the person's name from the message",
        category: "General"
    })
    seperator = ":";

    @SwitchProperty({
        name: "Auto Rejoin",
        description: "Automatically rejoin skyblock after getting kicked while joining that server",
        category: "General",
        property: "auto_rejoin"
    })
    autoRejoin = false;

    // Mask Timer Settings
    @SwitchProperty({
        name: "Enable Mask Timer",
        description: "Toggle the Mask Timer HUD",
        category: "Mask Timer",
        property: "mask_timer_enabled"
    })
    maskTimerEnabled = false;

    @ButtonProperty({
        name: "Move Bonzo GUI",
        description: "Open the Bonzo Timer GUI to move it",
        category: "Mask Timer",
        placeholder: "Move"
    })
    MoveBonzoTimerGui() {
        ChatLib.command("bonzogui", true);
    }

    @ButtonProperty({
        name: "Move Spirit GUI",
        description: "Open the Spirit Timer GUI to move it",
        category: "Mask Timer",
        placeholder: "Move"
    })
    MoveSpiritTimerGui() {
        ChatLib.command("spiritgui", true);
    }

    @ButtonProperty({
        name: "Move Phoenix GUI",
        description: "Open the Phoenix Timer GUI to move it",
        category: "Mask Timer",
        placeholder: "Move"
    })
    MovePhoenixTimerGui() {
        ChatLib.command("phoenixgui", true);
    }



    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "Starcrest Addons by Stiwyy");
        this.setCategoryDescription("Mask Timer", "Shows the cooldown of Bonzo mask, Spirit mask and Phoenix pet.");
    }
}

export default new Settings;
