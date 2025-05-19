import Settings from "./settings";
import commands from "./commands";
import features from "./features";

update();
function update() {
	commands.update();
	features.update();
}
