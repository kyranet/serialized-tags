const test = require('tape');
const { ArrayTag, BlockTag, StringTag, ValueTag, Util } = require('../src/index');

test('Util Construction', (t) => {
	t.plan(1);

	t.throws(() => new Util(), 'You may not construct this class.');
});

test('Util isObjectLiteral', (t) => {
	t.plan(9);

	// eslint-disable-next-line no-empty-function
	const noop = () => { };

	t.true(Util.isObjectLiteral({}));
	t.false(Util.isObjectLiteral(false));
	t.false(Util.isObjectLiteral(noop));
	t.false(Util.isObjectLiteral(0));
	t.false(Util.isObjectLiteral([]));
	t.false(Util.isObjectLiteral(Util));
	t.false(Util.isObjectLiteral('a'));
	t.false(Util.isObjectLiteral(Symbol('test')));
	t.false(Util.isObjectLiteral(undefined));
});

test('Util parseElement', (t) => {
	t.plan(10);

	// eslint-disable-next-line no-empty-function
	const noop = () => { };

	t.equal(Util.parseElement(null), null);
	t.equal(Util.parseElement(undefined), null);
	t.equal(Util.parseElement('Hello {0}').constructor, StringTag);
	t.equal(Util.parseElement(['Hello {0}']).constructor, ArrayTag);
	t.equal(Util.parseElement({ test: 'Hello {0}' }).constructor, BlockTag);
	t.equal(Util.parseElement(false).constructor, ValueTag);
	t.equal(Util.parseElement(noop).constructor, ValueTag);
	t.equal(Util.parseElement(0).constructor, ValueTag);
	t.equal(Util.parseElement(Util).constructor, ValueTag);
	t.equal(Util.parseElement(Symbol('test')).constructor, ValueTag);
});
