import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @CheckboxProperty, Color } from '../Vigilance';

@Vigilant("HypixelEmotes")
class Settings {

    @ButtonProperty({
        name: "Use MVP++ Emotes",
        description: "",
        category: "General",
        subcategory: "General",
        placeholder: "Toggle"
    })
    usemvpplusplusemotes() {
        const emotes = ['heart', 'star', 'yes', 'java', 'arrow', 'shrug', 'tableflip', 'o', 'totem', 'typing', 'maths', 'snail', 'thinking', 'gimme', 'wizard', 'pvp', 'peace', 'puffer'];
        emotes.forEach(emote => this[emote] = !this[emote]);
        Client.currentGui.close()
    }

    @ButtonProperty({
        name: "Use Rank Gifting Emotes",
        description: "",
        category: "General",
        subcategory: "General",
        placeholder: "Toggle",
    })
    usegiftingemotes() {
        const emotes = ['cat', 'dj', 'snow', 'dog', 'yey', 'dab', 'sloth', 'h', 'cute'];
        emotes.forEach(emote => this[emote] = !this[emote]);
        Client.currentGui.close()
    }

    @ButtonProperty({
        name: 'Sync with Hypixel',
        description: 'Automatically enables / disables emotes based on your hypixel profile &c&l(Hypixel API Key required) Go to "Hypixel API Key" to set your API Key',
        category: 'General',
        subcategory: 'General',
        placeholder: 'Sync'
    })
    sync() {
        ChatLib.command("syncwithhypixel", true)
        Client.currentGui.close();
    }

    @CheckboxProperty({
        name: "Enable replacing Emotes",
        description: '',
        category: 'General',
        subcategory: 'General',
        placeholder: ''
    })
    Enable = true

    @TextProperty({
        name: 'Hypixel API Key',
        description: 'Needed for automatic on / off switching of emotes',
        category: 'Hypixel API Key',
        subcategory: 'Hypixel API Key',
        placeholder: '',
    })
    APIKey = '';

    @CheckboxProperty({
        name: '❤',
        description: '<3',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    heart = true;

    @CheckboxProperty({
        name: '✮',
        description: ':star:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    star = true;

    @CheckboxProperty({
        name: '✔',
        description: ':yes:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    yes = true;

    @CheckboxProperty({
        name: '☕',
        description: ':java:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    java = true;

    @CheckboxProperty({
        name: '➜',
        description: ':arrow:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    arrow = true;

    @CheckboxProperty({
        name: '¯\\_(ツ)_/¯',
        description: ':shrug:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    shrug = true;

    @CheckboxProperty({
        name: '(╯°□°）╯︵ ┻━┻',
        description: ':tableflip:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    tableflip = true;

    @CheckboxProperty({
        name: '( ﾟ◡ﾟ)/',
        description: 'o/',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    o = true;

    @CheckboxProperty({
        name: '☉_☉',
        description: ':totem:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    totem = true;

    @CheckboxProperty({
        name: '✎...',
        description: ':typing:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    typing = true;

    @CheckboxProperty({
        name: '√(π+x)=L',
        description: ':maths:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    maths = true;

    @CheckboxProperty({
        name: '@\'-\' ',
        description: ':snail:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    snail = true;

    @CheckboxProperty({
        name: '(0.o?)',
        description: ':thinking:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    thinking = true;

    @CheckboxProperty({
        name: '༼つ◕_◕༽つ',
        description: ':gimme:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    gimme = true;

    @CheckboxProperty({
        name: '(\'-\')⊃━☆ﾟ.*･｡ﾟ',
        description: ':wizard:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    wizard = true;

    @CheckboxProperty({
        name: '⚔',
        description: ':pvp:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    pvp = true;

    @CheckboxProperty({
        name: '✌',
        description: ':peace:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    peace = true;

    @CheckboxProperty({
        name: '<(\'O\')>',
        description: ':puffer:',
        category: 'MVP++ Emotes',
        subcategory: 'MVP++ Emotes',
    })
    puffer = true;

    @CheckboxProperty({
        name: '(✿◠‿◠)',
        description: ':cute:',
        category: 'Rank Gifting Emotes',
        subcategory: 'Rank Gifting Emotes',
    })
    cute = true;

    @CheckboxProperty({
        name: '<o/',
        description: ':dab:',
        category: 'Rank Gifting Emotes',
        subcategory: 'Rank Gifting Emotes',
    })
    dab = true;

    @CheckboxProperty({
        name: 'ヽ (◕◡◕) ﾉ',
        description: ':yey:',
        category: 'Rank Gifting Emotes',
        subcategory: 'Rank Gifting Emotes',
    })
    yey = true;

    @CheckboxProperty({
        name: '(ᵔᴥᵔ)',
        description: ':dog:',
        category: 'Rank Gifting Emotes',
        subcategory: 'Rank Gifting Emotes',
    })
    dog = true;

    @CheckboxProperty({
        name: 'ヽ(⌐■_■)ノ♬',
        description: ':dj:',
        category: 'Rank Gifting Emotes',
        subcategory: 'Rank Gifting Emotes',
    })
    dj = true;

    @CheckboxProperty({
        name: '= ＾● ⋏ ●＾ =',
        description: ':cat:',
        category: 'Rank Gifting Emotes',
        subcategory: 'Rank Gifting Emotes',
    })
    cat = true;

    @CheckboxProperty({
        name: 'ヽ(^◇^*)/',
        description: 'h/',
        category: 'Rank Gifting Emotes',
        subcategory: 'Rank Gifting Emotes',
    })
    h = true;

    @CheckboxProperty({
        name: '☃',
        description: ':snow:',
        category: 'Rank Gifting Emotes',
        subcategory: 'Rank Gifting Emotes',
    })
    snow = true;

    @CheckboxProperty({
        name: '(・⊝・)',
        description: ':sloth:',
        category: 'Rank Gifting Emotes',
        subcategory: 'Rank Gifting Emotes',
    })
    sloth = true;


    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "&aCreated by Altpapier");
        this.setCategoryDescription("Rank Gifting Emotes", "&aCreated by Altpapier");
        this.setCategoryDescription("Hypixel API Key", "&aCreated by Altpapier");
        this.setCategoryDescription("MVP++ Emotes", "&aCreated by Altpapier");
    }
}
export default new Settings;