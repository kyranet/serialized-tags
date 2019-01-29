# js-tags

<div align="center">
  <p>
    <a href="https://www.npmjs.com/kyranet/js-tags"><img src="https://img.shields.io/npm/v/js-tags.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/kyranet/js-tags"><img src="https://img.shields.io/npm/dt/js-tags.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://travis-ci.org/kyranet/js-tags"><img src="https://travis-ci.org/kyranet/js-tags.svg" alt="Build status" /></a>
	<a href="https://travis-ci.org/kyranet/js-tags"><img src="https://travis-ci.org/kyranet/js-tags.svg?branch=master" alt="Build Status" /></a>
	<a href="https://lgtm.com/projects/g/kyranet/js-tags/alerts/"><img src="https://img.shields.io/lgtm/alerts/g/kyranet/js-tags.svg?logo=lgtm&logoWidth=18" alt="Total alerts" /></a>
	<a href="https://dependabot.com"><img src="https://api.dependabot.com/badges/status?host=github&repo=kyranet/js-tags" alt="Dependabot Status" /></a>
    <a href="https://www.patreon.com/kyranet"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/js-tags/"><img src="https://nodei.co/npm/js-tags.png?downloads=true&stars=true" alt="npm installnfo" /></a>
  </p>
</div>

## About

`js-tags` is a fast and lightweight tag template parser for primitive objects and values, it comes with support for
Arrays, Objects, Strings, and Value, all four being wrapped in classes implementing the same interface, reducing the
need to check values in your code.

The nature of this parser is to allow developers to use language files in the format of their convenience (JSON, YAML...)
and pass the output through this to parse the strings and prepare everything for later usage.

In a near future, this package will have a branch for webpack to allow developers use this on their web applications!

## Usage

As mentioned before, you can use (parsed) JSON objects for this package, given this file:

```json
{
    "hello": "Hello {0}!",
	"actions.hug": "{0} just hugged {1}!",
	"actions.pat": "{1} just got patted by {0}!",
	"actions.other": [
		"Hello {0}! Came back for more pats?",
		"Bye {0}! I will see you later!"
	]
}
```

You would parse this using the following code:

```javascript
// Assume jsonString is a string containing the previous JSON
// We will parse it into an object so jstags can work with it
const json = JSON.parse(jsonString);

// Parse with jstags
const parsed = new jstags.parse(json);
```

And now, we save it somewhere! Let's use `parsed` now!

```javascript
const salute = parsed.get('hello').display(['world']);
// -> Hello world!

const hug = parsed.get('actions.hug').display(['kyra', 'OSS']);
// -> kyra just hugged OSS!

const pat = parsed.get('actions.pat').display(['the reader', 'kyra']);
// -> kyra just got patted by the reader!

const otherSalute = parsed.get('actions.other').first().display(['kyra']);
// Identical to: parsed.get('actions.other').get(0).display(['kyra']);
// -> Hello kyra! Came back for more pats?

const otherBye = parsed.get('actions.other').last().display(['kyra']);
// Identical to: parsed.get('actions.other').get(1).display(['kyra']);
// -> Bye kyra! I will see you later!

// Or even, randoms!
const otherRandom = parsed.get('actions.other').random().display(['kyra']);
// -> Hello kyra! Came back for more pats?
// -> Bye kyra! I will see you later!
```
