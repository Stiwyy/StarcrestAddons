import Settings from '../settings';

const PosMessages = [
	{ message: 'At Early Enter 1!' },
	{ message: 'At Early Enter 2!' },
	{ message: 'At Early Enter 3!' },
	{ message: 'At Simon Says Device!' },
	{ message: 'At Levers Device!' },
	{ message: 'At Core!' },
	{ message: 'At Arrows Device!' },
	{ message: 'At Middle!' },
	{ message: 'At I4 (Sharp Shooter Device)!' },
];

const aliases = {
	ee1: 'Early Enter 1',
	ee2: 'Early Enter 2',
	ee3: 'Early Enter 3',
	ss: 'Simon Says Device',
	simon: 'Simon Says Device',
	'simon says': 'Simon Says Device',
	'ss device': 'Simon Says Device',
	levers: 'Levers Device',
	core: 'Core',
	arrows: 'Arrows Device',
	middle: 'Middle',
	i4: 'I4 (Sharp Shooter Device)',
	sharp: 'I4 (Sharp Shooter Device)',
	shooter: 'I4 (Sharp Shooter Device)',
};

const recentMessages = new Set();
const CACHE_EXPIRY_MS = 5000;

function normalizeMessage(msg) {
	return msg
		.toLowerCase()
		.replace(/[^\w\s]/g, '')
		.replace(/^(at|i'?m at|i am at|reached|at the|im at)\s+/i, '')
		.trim();
}

function detectPosition(message) {
	ChatLib.chat(`&6[DEBUG]&r detectPosition called with msg="${message}"`);

	const normalizedMessage = normalizeMessage(message);
	ChatLib.chat(`&6[DEBUG]&r normalizedMessage="${normalizedMessage}"`);

	for (const [alias, fullName] of Object.entries(aliases)) {
		if (normalizedMessage === alias || normalizedMessage.includes(alias)) {
			ChatLib.chat(
				`&6[DEBUG]&r Matched alias "${alias}" → "${fullName}"`
			);
			return fullName;
		}
	}

	for (const { message: raw } of PosMessages) {
		const normalizedPos = normalizeMessage(raw);
		if (
			normalizedMessage.includes(normalizedPos) ||
			normalizedPos.includes(normalizedMessage)
		) {
			const clean = raw.replace(/^At /, '').replace(/!$/, '');
			ChatLib.chat(
				`&6[DEBUG]&r Matched PosMessages "${raw}" → "${clean}"`
			);
			return clean;
		}
	}

	ChatLib.chat(`&6[DEBUG]&r No position detected`);
	return null;
}

register('chat', (...args) => {
	if (!Settings.enabled || !Settings.earlyEnterTitleEnabled) {
		ChatLib.chat('&6[DEBUG]&r Module disabled, skipping');
		return;
	}

	let event = args[args.length - 1];
	let rawPlayer = args[0];
	let message = args[1];

	cancel(event);

	let player = ChatLib.removeFormatting(rawPlayer);
	ChatLib.chat(
		`&6[DEBUG]&r Processing party chat - Player: ${player}, Message: ${message}`
	);

	const position = detectPosition(message);
	if (!position) return;

	const cacheKey = `${player}-${position}`;
	if (recentMessages.has(cacheKey)) {
		ChatLib.chat(
			`&6[DEBUG]&r Duplicate within ${CACHE_EXPIRY_MS}ms, skipping`
		);
		return;
	}

	recentMessages.add(cacheKey);
	setTimeout(() => recentMessages.delete(cacheKey), CACHE_EXPIRY_MS);

	ChatLib.chat(`&a[DEBUG]&r Showing title: ${player} is at ${position}`);
	Client.showTitle(`${player} is at ${position}!`, '', 10, 40, 10);

	if (Settings.playSound) {
		World.playSound('random.orb', 1.0, 1.0);
	}
}).setCriteria('&r&9Party &8> ${*} ${player}: &r${message}&r');
