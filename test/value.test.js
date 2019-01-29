const test = require('tape');
const { ValueTag } = require('../src/index');

test('Value Template Parser', (t) => {
	t.plan(2);

	const valueTag = new ValueTag();
	t.equal(valueTag.parse(1), valueTag);
	t.equal(valueTag.value, 1);
});

test('Value Template Parser Display', (t) => {
	t.plan(1);

	const valueTag = new ValueTag()
		.parse(1);
	t.equal(valueTag.display(), 1);
});
