const test = require('tape');
const { ArrayTag } = require('../src/index');

test('Array Template Parser', (t) => {
	t.plan(2);

	const arrayTag = new ArrayTag();
	t.equal(arrayTag.parse(['Hello {0}']), arrayTag);
	t.equal(arrayTag.length, 1);
});

test('Array Template Parser Get (Empty)', (t) => {
	t.plan(2);

	const arrayTag = new ArrayTag()
		.parse([]);

	t.equal(arrayTag.get(0), null);
	t.equal(arrayTag.get('random'), null);
});

test('Array Template Parser Get (Populated)', (t) => {
	t.plan(5);

	const arrayTag = new ArrayTag()
		.parse(['Hello {0}', 'Bye {0}']);

	// Valid accesses
	t.not(arrayTag.get(0), null);
	t.not(arrayTag.get(1), null);

	// Random should never be null unless it's empty
	t.not(arrayTag.get('random'), null);

	// Invalid indexes should return null
	t.equal(arrayTag.get(-1), null);
	t.equal(arrayTag.get(2), null);
});

test('Array Template Parser First (Empty)', (t) => {
	t.plan(1);

	const arrayTag = new ArrayTag()
		.parse([]);

	t.equal(arrayTag.first(), null);
});

test('Array Template Parser First (Populated)', (t) => {
	t.plan(2);

	const arrayTag = new ArrayTag()
		.parse(['Hello {0}', 'World {1}']);

	t.not(arrayTag.first(), null);
	t.equal(arrayTag.first(), arrayTag.get(0));
});

test('Array Template Parser Last (Empty)', (t) => {
	t.plan(1);

	const arrayTag = new ArrayTag()
		.parse([]);

	t.equal(arrayTag.last(), null);
});

test('Array Template Parser Last (Populated)', (t) => {
	t.plan(2);

	const arrayTag = new ArrayTag()
		.parse(['Hello {0}', 'World {1}']);

	t.not(arrayTag.last(), null);
	t.equal(arrayTag.last(), arrayTag.get(1));
});

test('Array Template Parser Random (Empty)', (t) => {
	t.plan(1);

	const arrayTag = new ArrayTag()
		.parse([]);

	t.equal(arrayTag.random(), null);
});

test('Array Template Parser Random (Populated)', (t) => {
	t.plan(2);

	const arrayTag = new ArrayTag()
		.parse(['Hello {0}', 'World {1}']);

	t.not(arrayTag.random(), null);
	t.true(arrayTag.indexOf(arrayTag.random()) !== -1);
});
