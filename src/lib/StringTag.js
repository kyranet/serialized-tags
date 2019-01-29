const CHAR_OPENING = '{';
const CHAR_CLOSING = '}';

class StringTag {

	constructor() {
		this.required = 0;
		this.tags = [];
	}

	display(values = []) {
		if (values.length < this.required) throw new Error(`Expected ${this.required} argument(s), got: ${values.length} instead.`);
		return this.tags.map((part) => typeof part === 'number' ? values[part] : part).join('');
	}

	/**
	 * Parse the string tag
	 * @param {string} element The string to parse
	 * @returns {this}
	 */
	parse(element) {
		let current = '';
		let tag = false;
		for (let i = 0, char; i < element.length; i++) {
			char = element.charAt(i);
			if (char === CHAR_OPENING) {
				// Nested tags are not allowed
				if (tag) throw new Error(`(${i}) Nested tags are not allowed.`);

				// If there was text, push the string
				if (current.length)
					this.tags.push(current);

				// Set the tag to true and the current string to empty
				tag = true;
				current = '';
			} else if (char === CHAR_CLOSING) {
				// Closing tags without an active tag are not allowed
				if (!tag) throw new Error(`(${i}) Closing tags without an active tag are not allowed.`);
				// '{}' is not allowed
				if (!current.length) throw new Error(`(${i}) Empty tags are not allowed.`);

				const n = Number(current);
				// Invalid numbers or unsafe integers are not allowed.
				if (Number.isNaN(n) || !Number.isSafeInteger(n)) throw new Error(`(${i}) Expected a safe integer, got ${n} instead.`);

				if (n + 1 > this.required) this.required = n + 1;

				// Set tag to false, current string to empty, and push the number
				tag = false;
				current = '';
				this.tags.push(n);
			} else {
				current += char;
			}
		}

		if (current.length) this.tags.push(current);

		return this;
	}

}

module.exports = StringTag;
