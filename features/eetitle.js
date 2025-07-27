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
	{ message: 'At I4' },
];
const aliases = {
	ee1: 'Early Enter 1',
	ee2: 'Early Enter 2',
	ee3: 'Early Enter 3',
	ss: 'Simon Says Device',
	simon: 'Simon Says Device',
	levers: 'Levers Device',
	core: 'Core',
	arrows: 'Arrows Device',
	middle: 'Middle',
	i4: 'I4 (Sharp Shooter Device)',
	'ss device': 'Simon Says Device',
	'simon says': 'Simon Says Device',
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

function detectPosition(player, message) {
	if (!Settings.enabled && !Settings.earlyEnterTitleEnabled) return;

	const normalizedMessage = normalizeMessage(message);

	// Check if message includes aliases
	for (const [alias, fullName] of Object.entries(aliases)) {
		if (normalizedMsg === alias || normalizedMsg.includes(alias)) {
			return fullName;
		}
	}
	for (const posEntry of PosMessages) {
		const normalizedPosMsg = normalizeMessage(posEntry.message);

		if (
			normalizedMsg.includes(normalizedPosMsg) ||
			normalizedPosMsg.includes(normalizedMsg)
		) {
			return posEntry.message.replace(/^At /, '').replace(/!$/, '');
		}
	}
	return null;
}
