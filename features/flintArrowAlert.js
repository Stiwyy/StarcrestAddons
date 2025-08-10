import Settings from '../settings';
import Utils from '../../BloomCore/utils/Utils';

register('pickupItem', (entityItem, player, pos, motion, event) => {
	if (!Settings.enabled || !Settings.flintArrowAlert) return;

	const item = new Item(entityItem);
	const sbID = Utils.getSkyblockItemID(item);

	if (sbID === 'FLINT_ARROW') {
		ChatLib.chat('&aPicked up a &bFlint Arrow&a!');
		World.playSound('random.orb', 1, 1);
	}
});
