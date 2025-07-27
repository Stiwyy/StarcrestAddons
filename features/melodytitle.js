import Settings from '../settings';

const CACHE_EXPIRY_MS = 5000;
const recentMelodyMessages = new Set();

function debug(message) {
	if (Settings.debugMessages) {
		ChatLib.chat(`&6[DEBUG]&r &f${message}`);
	}
}

function extractUsername(player) {
	const cleanPlayer = ChatLib.removeFormatting(player);
	const username = cleanPlayer.replace(/^\[.*?\]\s*/, '');
	debug(`Extracted username: "${username}" from "${cleanPlayer}"`);
	return username;
}

function detectMelody(message) {
	debug(`Checking for melody in message: "${message}"`);

	const lowerMsg = message.toLowerCase();

	// Basic melody detection pattern
	const basicMelodyPattern = /\bmelody\b/i;
	if (!basicMelodyPattern.test(lowerMsg)) {
		debug(`No mention of melody in message`);
		return false;
	}

	const fractionPattern = /\bmelody\s+(\d+)\/4\b/i;

	const percentPattern = /\bmelody\s+(\d+)%\b/i;

	const hasFraction = fractionPattern.test(lowerMsg);
	const hasPercent = percentPattern.test(lowerMsg);
	const justMelody = /^melody\s*!*$/i.test(lowerMsg.trim());

	debug(
		`Melody detection: fraction=${hasFraction}, percent=${hasPercent}, justMelody=${justMelody}`
	);

	return hasFraction || hasPercent || justMelody;
}

register('chat', (player, message, event) => {
	if (!Settings.enabled || !Settings.melodyTitleEnabled) {
		debug(`Melody module disabled, skipping`);
		return;
	}

	const playerName = extractUsername(player);
	debug(
		`Processing melody message - Player: ${playerName}, Message: ${message}`
	);

	if (!detectMelody(message)) {
		debug(`Not a melody message, ignoring`);
		return;
	}

	const cacheKey = `${playerName}-melody`;
	if (recentMelodyMessages.has(cacheKey)) {
		debug(`Duplicate melody message within ${CACHE_EXPIRY_MS}ms, skipping`);
		return;
	}

	recentMelodyMessages.add(cacheKey);
	setTimeout(() => recentMelodyMessages.delete(cacheKey), CACHE_EXPIRY_MS);

	debug(`Showing melody title for ${playerName}`);
	Client.showTitle(`&3${playerName} has melody!`, '', 10, 40, 10);
}).setCriteria('&r&9Party &8> ${player}: &r${message}&r');
