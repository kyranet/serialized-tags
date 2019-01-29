class ValueTag {

	constructor() {
		this.value = null;
	}

	display() {
		return this.value;
	}

	parse(element) {
		this.value = element;
		return this;
	}

}

module.exports = ValueTag;
