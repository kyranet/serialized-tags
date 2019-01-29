class Util {

	constructor() {
		throw new Error('You may not construct this class.');
	}

	static isObjectLiteral(object) {
		return object ? object.constructor === Object : false;
	}

	static parseElement(element) {
		// eslint-disable-next-line eqeqeq
		if (element == null) return null;
		if (typeof element === 'string') return new StringTag().parse(element);
		if (Array.isArray(element)) return new ArrayTag().parse(element);
		if (Util.isObjectLiteral(element)) return new BlockTag().parse(element);
		return new ValueTag().parse(element);
	}

}

module.exports = Util;

const ArrayTag = require('../ArrayTag');
const BlockTag = require('../BlockTag');
const StringTag = require('../StringTag');
const ValueTag = require('../ValueTag');
