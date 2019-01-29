class BlockTag extends Map {

	display() {
		return this;
	}

	parse(element) {
		for (const key of Object.keys(element))
			this.set(key, parseElement(element[key]));
		return this;
	}

}

module.exports = BlockTag;

const { parseElement } = require('./util/Util');
