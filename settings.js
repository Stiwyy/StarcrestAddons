//All taken from universal bridge https://github.com/MisterCheezeCake/UniversalBridge


import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @CheckboxProperty, @SelectorProperty } from '../Vigilance/index';

@Vigilant("BridgebotImages", "Settings", {
    getCategoryComparator: () => (a) => {
        const categories = ['General'];
        return categories.indexOf(a.name);
    }
})
class Settings {

    @SwitchProperty({
        name: "Enabled",
        description: "Toggle the module",
        category: "General",
    })
    enabled = true
    @TextProperty({
        name: "Bot Name",
        description: "Input the IGN of your guild bridge bot",
        category: "General",
        placeholder: "IGN Here"
    })
    botName = ""
    @TextProperty({
        name: "Seperator",
        description: "The string that your guild uses to seperate the person's name from the message",
        category: "General"
    })
    seperator = ":"
   
    @SwitchProperty({
        name: "Auto Rejoin",
        description: "Automatically rejoin skyblock after getting kicked while joining that server",
        category: "General",
        property: "auto_rejoin"
    })
    autoRejoin = false 

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "BridgeBotImages by Stiwyy") 
    }
}

export default new Settings;
