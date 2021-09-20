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
		let xpForNextLevel = config.levelling.level_1_xp;
		for (var i = 1; i <= xp; i++) {
			if (i === xpForNextLevel >> 0) {
				level++;
				xpForNextLevel = xpForNextLevel * config.levelling.xp_multiplier_per_level;
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

	remainingXp() {
		return this.xp - this.xpForLevel(this.toLevel() - 1)
	}
	
	xpForLevel(level) {
		var xpForNextLevel = config.levelling.level_1_xp;
		for (var i = 1; i <= level; i++) {
			xpForNextLevel = xpForNextLevel * config.levelling.xp_multiplier_per_level;
		}
		return xpForNextLevel >> 0;
	}
	
	xpForNextLevel() {
		return this.xpForLevel(this.toLevel() + 1)
	}

	addXp() {
		this.xp++;
	}
}