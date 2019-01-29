const test = require('tape');
const { BlockTag } = require('../src/index');

test('Block Template Parser', (t) => {
	t.plan(3);

	const blockTag = new BlockTag();
	t.equal(blockTag.parse({ test: 'Hello {0}' }), blockTag);
	t.equal(blockTag.size, 1);
	t.not(blockTag.get('test'), null);
});

test('Block Template Parser (Empty)', (t) => {
	t.plan(1);

	const blockTag = new BlockTag()
		.parse({});
	t.equal(blockTag.size, 0);
});

test('Block Template Parser Display', (t) => {
	t.plan(1);

	const blockTag = new BlockTag()
		.parse({});
	t.equal(blockTag.display(), blockTag);
});
