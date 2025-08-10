// Detects when Goldor's Phase starts
let p3Active = false;

export function isP3Active() {
	return p3Active;
}

function debug(message) {
	if (Settings.debugMessages) {
		ChatLib.chat(`&6[DEBUG]&r &f${message}`);
	}
}

register('chat', () => {
	p3Active = true;
	debug('P3 started — p3Active = true');
}).setCriteria('[BOSS] Goldor: Who dares trespass into my domain?');

// Reset when switching server/world
register('serverLoad', () => {
	p3Active = false;
	debug('Server/world changed — p3Active reset to false');
});

register('worldLoad', () => {
	p3Active = false;
	debug('World reloaded — p3Active reset to false');
});
