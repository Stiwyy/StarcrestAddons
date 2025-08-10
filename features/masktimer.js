import Settings from '../settings';
import ScalableGui from '../../BloomCore/utils/ScalableGui';
import PogObject from '../../PogData';

let bonzotime = 0;
let spirittime = 0;
let phoenixtime = 0;
let proctext = '';

const data = new PogObject(
	'StarcrestAddons',
	{
		bonzoTimerGui: { x: 50, y: 50, scale: 1 },
		spiritTimerGui: { x: 200, y: 50, scale: 1 },
		phoenixTimerGui: { x: 350, y: 50, scale: 1 },
	},
	'data.json'
);

data.autosave(1);

const bonzoGui = new ScalableGui(data, data.bonzoTimerGui).setCommand(
	'bonzogui'
);
const spiritGui = new ScalableGui(data, data.spiritTimerGui).setCommand(
	'spiritgui'
);
const phoenixGui = new ScalableGui(data, data.phoenixTimerGui).setCommand(
	'phoenixgui'
);

const bonzoText = new Text('')
	.setScale(2)
	.setShadow(true)
	.setColor(Renderer.WHITE);
const spiritText = new Text('')
	.setScale(2)
	.setShadow(true)
	.setColor(Renderer.WHITE);
const phoenixText = new Text('')
	.setScale(2)
	.setShadow(true)
	.setColor(Renderer.WHITE);

function resetTimer(type, duration, message) {
	switch (type) {
		case 'bonzo':
			bonzotime = duration;
			break;
		case 'spirit':
			spirittime = duration;
			break;
		case 'phoenix':
			phoenixtime = duration;
			break;
	}
	proctext = message;
	setTimeout(() => {
		if (proctext === message) proctext = '';
	}, 1500);
}

function decrementTimers() {
	if (bonzotime > 0) bonzotime--;
	if (spirittime > 0) spirittime--;
	if (phoenixtime > 0) phoenixtime--;
}

bonzoGui.onRender(() => {
	if (!Settings.maskTimerEnabled) return;
	const str =
		bonzotime <= 0
			? '&9Bonzo: &a✔'
			: `&9Bonzo: &6${(bonzotime / 10).toFixed(1)}`;
	bonzoText.setString(str).draw(0, 0);
}, true);

spiritGui.onRender(() => {
	if (!Settings.maskTimerEnabled) return;
	const str =
		spirittime <= 0
			? '&fSpirit: &a✔'
			: `&fSpirit: &6${(spirittime / 10).toFixed(1)}`;
	spiritText.setString(str).draw(0, 0);
}, true);

phoenixGui.onRender(() => {
	if (!Settings.maskTimerEnabled) return;
	const str =
		phoenixtime <= 0
			? '&cPhoenix: &a✔'
			: `&cPhoenix: &6${(phoenixtime / 10).toFixed(1)}`;
	phoenixText.setString(str).draw(0, 0);
}, true);

register('renderOverlay', () => {
	if (!Settings.maskTimerEnabled) return;

	if (!bonzoGui.isOpen()) {
		Renderer.translate(bonzoGui.getX(), bonzoGui.getY());
		Renderer.scale(bonzoGui.getScale());
		const str =
			bonzotime <= 0
				? '&9Bonzo: &a✔'
				: `&9Bonzo: &6${(bonzotime / 10).toFixed(1)}`;
		bonzoText.setString(str).draw(0, 0);
		Renderer.finishDraw();
	}

	if (!spiritGui.isOpen()) {
		Renderer.translate(spiritGui.getX(), spiritGui.getY());
		Renderer.scale(spiritGui.getScale());
		const str =
			spirittime <= 0
				? '&fSpirit: &a✔'
				: `&fSpirit: &6${(spirittime / 10).toFixed(1)}`;
		spiritText.setString(str).draw(0, 0);
		Renderer.finishDraw();
	}

	if (!phoenixGui.isOpen()) {
		Renderer.translate(phoenixGui.getX(), phoenixGui.getY());
		Renderer.scale(phoenixGui.getScale());
		const str =
			phoenixtime <= 0
				? '&cPhoenix: &a✔'
				: `&cPhoenix: &6${(phoenixtime / 10).toFixed(1)}`;
		phoenixText.setString(str).draw(0, 0);
		Renderer.finishDraw();
	}
});

function renderProcText() {
	if (!Settings.maskTimerEnabled) return;
	new Text(proctext)
		.setScale(2)
		.setShadow(true)
		.setColor(Renderer.WHITE)
		.draw(400, 100);
}
register('renderOverlay', renderProcText);

register('step', decrementTimers).setFps(10);

register('chat', () =>
	resetTimer('bonzo', 1800, '&9Bonzo Mask Procced')
).setCriteria(/Your (⚚)? Bonzo's Mask saved your life!/);

register('chat', () =>
	resetTimer('spirit', 300, '&fSpirit Mask Procced')
).setCriteria('Second Wind Activated! Your Spirit Mask saved your life!');

register('chat', () =>
	resetTimer('phoenix', 600, '&cPhoenix Procced')
).setCriteria('Your Phoenix Pet saved you from certain death!');
