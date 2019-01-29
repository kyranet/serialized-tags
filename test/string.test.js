const test = require('tape');
const { StringTag } = require('../src/index');

test('String Template Parser', (t) => {
	t.plan(4);

	const stringTag = new StringTag();
	t.equal(stringTag.parse('Hello {0}, I am {1}'), stringTag);
	t.equal(stringTag.required, 2);
	t.equal(stringTag.tags.length, 4);
	t.equal(stringTag.display(['human', 'kyra']), 'Hello human, I am kyra');
});

test('String Template Too Little Values', (t) => {
	t.plan(3);

	const stringTag = new StringTag()
		.parse('Hello {0}, I am {1}');

	t.equal(stringTag.required, 2);
	t.throws(() => stringTag.display([]));
	t.throws(() => stringTag.display(['human']));
});

test('String Template Nested Opening Tags', (t) => {
	t.plan(1);

	const stringTag = new StringTag();
	t.throws(() => stringTag.parse('{{0}'),
		'(1) Closing tags without an active tag are not allowed.');
});

test('String Template Empty Tag', (t) => {
	t.plan(1);

	const stringTag = new StringTag();
	t.throws(() => stringTag.parse('{}'),
		'(1) Empty tags are not allowed.');
});

test('String Template Invalid Tag', (t) => {
	t.plan(2);

	const stringTag = new StringTag();
	const n = Number.MAX_SAFE_INTEGER + 1;

	// Invalid number
	t.throws(() => stringTag.parse('{n}'),
		'(1) Expected a safe integer, got n instead.');

	// Not a safe integer
	t.throws(() => stringTag.parse(`{${n}}`),
		`(1) Expected a safe integer, got ${n} instead.`);
});

test('String Template Closing Unexistent Tag', (t) => {
	t.plan(1);

	const stringTag = new StringTag();
	t.throws(() => stringTag.parse('}'),
		'(0) Closing tags without an active tag are not allowed.');
});
