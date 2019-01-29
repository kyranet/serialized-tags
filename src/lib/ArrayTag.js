class ArrayTag extends Array {

	display() {
		return this;
	}

	parse(element) {
		for (const value of element) this.push(parseElement(value));
		return this;
	}

	get(index) {
		if (index === 'random') return this.random();
		const value = this[index];
		// eslint-disable-next-line eqeqeq
		return value == null ? null : value;
	}

	first() {
		return this.length ? this[0] : null;
	}

	last() {
		return this.length ? this[this.length - 1] : null;
	}

	random() {
		return this.length ? this[Math.floor(Math.random() * this.length)] : null;
	}

}

module.exports = ArrayTag;

const { parseElement } = require('./util/Util');
