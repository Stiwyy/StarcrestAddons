import Settings from '../settings';

const PosMessages = [
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

function debug(message) {
	if (Settings.debugMessages) {
		ChatLib.chat(`&6[DEBUG]&r &f${message}`);
	}
}

function normalizeMessage(msg) {
	debug(`normalizeMessage input: "${msg}"`);

	let normalized = msg.toLowerCase();
	normalized = normalized.replace(/[^\w\s()0-9]/g, '');
	normalized = normalized.replace(
		/^(at|at the|im at|i am at|im|i am|reached)\s+/i,
		''
	);
	normalized = normalized.replace(/\s+/g, ' ').trim();

	debug(`normalizeMessage output: "${normalized}"`);
	return normalized;
}

function getCleanPositionName(message) {
	return message.replace(/^At /, '').replace(/!$/, '');
}

function detectPosition(userMsg) {
	debug(`detectPosition called with msg="${userMsg}"`);
	const normalizedUserMsg = normalizeMessage(userMsg);
	debug(`normalizedUserMsg="${normalizedUserMsg}"`);

	let allMatches = [];

	PosMessages.forEach((posObj) => {
		const cleanPosName = getCleanPositionName(posObj.message);
		const normalizedPosName = normalizeMessage(cleanPosName);

		const exactMatch = normalizedUserMsg === normalizedPosName;
		const userContainsPos =
			normalizedUserMsg.indexOf(normalizedPosName) !== -1;
		const posContainsUser =
			normalizedUserMsg.length > 3 &&
			normalizedPosName.indexOf(normalizedUserMsg) !== -1;

		const userWords = normalizedUserMsg.split(' ');
		const posWords = normalizedPosName.split(' ');
		const wordMatch =
			posWords.length > 1 &&
			posWords.every((word) => userWords.includes(word));

		debug(
			`Position check: "${cleanPosName}" - exact=${exactMatch}, userContainsPos=${userContainsPos}, posContainsUser=${posContainsUser}, wordMatch=${wordMatch}`
		);

		if (exactMatch || userContainsPos || posContainsUser || wordMatch) {
			let quality = 0;
			if (exactMatch) quality = 1000;
			else if (wordMatch) quality = 500;
			else if (userContainsPos) quality = 100 + normalizedPosName.length;
			else if (posContainsUser) quality = 50 + normalizedUserMsg.length;

			allMatches.push({
				type: 'position',
				value: cleanPosName,
				quality: quality,
			});

			debug(
				`Matched position: "${cleanPosName}" with quality ${quality}`
			);
		}
	});

	Object.entries(aliases).forEach(([alias, fullName]) => {
		const normalizedAlias = normalizeMessage(alias);

		if (!alias.includes(' ')) {
			const wordBoundaryMatch = new RegExp(
				`\\b${normalizedAlias}\\b`
			).test(normalizedUserMsg);
			const startsWithMatch =
				normalizedUserMsg.startsWith(normalizedAlias);
			const endsWithMatch = normalizedUserMsg.endsWith(normalizedAlias);
			const containsMatch = normalizedUserMsg.includes(normalizedAlias);

			debug(
				`Alias check: "${alias}" - wordBoundary=${wordBoundaryMatch}, startsWith=${startsWithMatch}, endsWith=${endsWithMatch}, contains=${containsMatch}`
			);

			if (
				wordBoundaryMatch ||
				startsWithMatch ||
				endsWithMatch ||
				(containsMatch && normalizedAlias.length > 2)
			) {
				const quality = wordBoundaryMatch
					? 300
					: startsWithMatch || endsWithMatch
					? 200
					: 100;

				allMatches.push({
					type: 'alias',
					value: fullName,
					alias: alias,
					quality: quality + normalizedAlias.length,
				});

				debug(
					`Matched alias: "${alias}" → "${fullName}" with quality ${
						quality + normalizedAlias.length
					}`
				);
			}
		} else {
			const aliasWords = normalizedAlias.split(' ');
			const userWords = normalizedUserMsg.split(' ');

			const allWordsPresent = aliasWords.every(
				(word) =>
					userWords.includes(word) || normalizedUserMsg.includes(word)
			);

			const exactPhraseMatch =
				normalizedUserMsg.includes(normalizedAlias);

			debug(
				`Multi-word alias check: "${alias}" - allWordsPresent=${allWordsPresent}, exactPhrase=${exactPhraseMatch}`
			);

			if (allWordsPresent || exactPhraseMatch) {
				const quality = exactPhraseMatch ? 400 : 250;

				allMatches.push({
					type: 'alias',
					value: fullName,
					alias: alias,
					quality: quality + normalizedAlias.length,
				});

				debug(
					`Matched multi-word alias: "${alias}" → "${fullName}" with quality ${
						quality + normalizedAlias.length
					}`
				);
			}
		}
	});

	if (allMatches.length === 0) {
		debug(`No position detected`);
		return null;
	}

	allMatches.sort((a, b) => b.quality - a.quality);
	const bestMatch = allMatches[0];

	debug(
		`Best match: ${bestMatch.type} "${bestMatch.value}" (quality: ${bestMatch.quality})`
	);
	return bestMatch.value;
}

function extractUsername(player) {
	const cleanPlayer = ChatLib.removeFormatting(player);
	const username = cleanPlayer.replace(/^\[.*?\]\s*/, '');
	debug(`Extracted username: "${username}" from "${cleanPlayer}"`);
	return username;
}

register('chat', (player, message, event) => {
	if (!Settings.enabled || !Settings.earlyEnterTitleEnabled) {
		debug(`Module disabled, skipping`);
		return;
	}

	const playerName = extractUsername(player);
	debug(`Processing chat - Player: ${playerName}, Message: ${message}`);

	const position = detectPosition(message);
	if (!position) return;

	const cacheKey = `${playerName}-${position}`;
	if (recentMessages.has(cacheKey)) {
		debug(`Duplicate within ${CACHE_EXPIRY_MS}ms, skipping`);
		return;
	}

	recentMessages.add(cacheKey);
	setTimeout(() => recentMessages.delete(cacheKey), CACHE_EXPIRY_MS);

	debug(`Showing title: ${playerName} at ${position}`);
	Client.showTitle(`${playerName} is at ${position}!`, '', 10, 40, 10);
}).setCriteria('&r&9Party &8> ${player}: &r${message}&r');
