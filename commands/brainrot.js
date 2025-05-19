import Settings from "./settings";
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