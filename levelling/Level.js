const config = require('../JSON/config.json');
const quickdb = require('quick.db');
const levelTable = new quickdb.table(`levels`);

module.exports = class Level {

	xp;

	constructor(xp) {
		this.xp = xp;
	}

	toLevel() {
		var xp = this.xp;
		var level = 0;
		var i = 0;
		while (i == 0) {
			if (xp >= this.xpForLevel(level)) {
				level++;
				xp -= this.xpForLevel(level);
			} else {
				i = 1;
			}
		}
		return level;
	}

	getRank() {
		const ranks = [];
		levelTable.all().forEach(rank => {
			ranks.push(rank.data);
		})
		ranks.sort((a, b) => b - a);
		if (ranks.indexOf(`${this.xp}`) <= -1) return ranks.length + 1;
		return ranks.indexOf(`${this.xp}`) + 1;
	}

	xpForLevel(level) {
		return (Math.pow(config.levelling.xp_multiplier_per_level, (level - 1))) * config.levelling.level_1_xp >> 0;
	}

	xpForNextLevel() {
		return this.xpForLevel(this.toLevel() + 2)
	}

	addXp() {
		this.xp++;
	}
}