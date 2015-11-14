#!/usr/bin/env node
/**
 * Returns an ES6 module that exports an array with selected data
 * from emojione's emoji.json file
 *
 * Sample output:
 *
 * export default [
 * ["1F469-1F469-1F467-1F467","👩👩👧👧",":family_wwgg:"],
 * ["1F468-1F469-1F467-1F466","👨👩👧👦",":family_mwgb:"],
 * ["1F468-1F469-1F466-1F466","👨👩👦👦",":family_mwbb:"],
 * ["1F468-1F469-1F467-1F467","👨👩👧👧",":family_mwgg:"],
 * ...
 */
'use strict';

const path = require('path');
const data = require('emojione/emoji.json');

const INCLUDE_ASCII = false;
const COMMENT = `// Do not edit!\n// This file was auto-generated by ${path.basename(__filename)}\n`;

const items = Object.keys(data).map(key => {
	const emoji = data[key];
	const codepoint = emoji.unicode;
	return {
		codepoint: codepoint,
		unicode: String.fromCodePoint(...codepoint.split('-').map(c => parseInt(c, 16))),
		short: emoji.shortname,
		ascii: emoji.aliases_ascii
	};
});

items.sort((a, b) => b.codepoint.length - a.codepoint.length);

const str = items.map(item =>
	JSON.stringify([item.codepoint, item.unicode, item.short, item.ascii].slice(0, INCLUDE_ASCII ? 4 : 3))
).join(',\n');

console.log(`${COMMENT}export default [\n${str}\n];`);