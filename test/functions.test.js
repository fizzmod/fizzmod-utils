/* eslint-env mocha */

import axios from 'axios';
import customData from '../src/__mocks__/customData';

import {
	setCurrency,
	formatPrice,
	sanitizeString,
	getResizedImage,
	setStrLength,
	calculatePercentDiscount,
	stripHost,
	getCustomDataInfo,
	setCookie,
	getCookie,
	getServerTime
} from '../src';

const assert = require('assert');
const jsdom = require('jsdom');
const nock = require('nock');
const expect = require('expect.js');

const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = window;

describe('Test functions utils', () => {
	before(() => {
		axios.defaults.baseURL = 'http://localhost:5000';
		global.document = document;
		global.window = window;
	});

	it('check if set correct a currency', () => {
		setCurrency('S/');
		const price = formatPrice(100);
		expect(price).to.be('S/100,00');
	});

	it('check if set correct a currency with param mode', () => {
		const price = formatPrice(100, '.', ',', 2, '$$');
		expect(price).to.be('$$100,00');
	});

	it('check if show correct price without currency', () => {
		setCurrency(null);
		const price = formatPrice(100, '.', ',', 2);
		expect(price).to.be('100,00');
	});

	it('check if show correct price if pass string number', () => {
		setCurrency(null);
		const price = formatPrice('100', '.', ',', 2);
		expect(price).to.be('100,00');
	});

	it('check if show correct price if pass currency euro', () => {
		setCurrency('€');
		const price = formatPrice('100', '.', ',', 2);
		expect(price).to.be('100,00€');
	});

	it('check if sanitize correct', () => {
		const string = sanitizeString('Hello world jaja');
		expect(string).to.be('hello-world-jaja');
	});

	it('check if image is resized correctly', () => {
		const url = getResizedImage(
			'http://fizzmod.vteximg.com.br/arquivos/ids/155242-292-292/image.png',
			150,
			150
		);

		expect(url).to.be('http://fizzmod.vteximg.com.br/arquivos/ids/155242-150-150/image.png');
	});

	it('check if resolve url without changes', () => {
		const url = getResizedImage(
			'http://fizzmod.vteximg.com.br/arquivos/ids/155242-292-292/image.png'
		);

		expect(url).to.be('http://fizzmod.vteximg.com.br/arquivos/ids/155242-292-292/image.png');
	});

	it('check if set cookie correct', () => {
		setCookie('test', 1234);
		expect(document.cookie).to.contain('test=1234');
	});

	it('check if set cookie with domain', () => {
		setCookie('test', 1234, 1, true);
		expect(document.cookie).to.contain('test=1234');
	});

	it('check if set cookie correct with object', () => {
		const data = { test: 'test', number: 1 };
		setCookie('testObj', data);
		expect(document.cookie).to.contain(`testObj=${JSON.stringify(data)}`);
	});

	it('check if get cookie correct ', () => {
		setCookie('option', 12345);
		expect(getCookie('option')).to.be('12345');
	});

	it('check if get cookie not exist return string empty ', () => {
		expect(getCookie('sarasdasd')).to.be('');
	});

	it('check if get hour server ', () => {
		nock('http://localhost:5000/')
			.get('/no-cache/HoraAtualServidor.aspx')
			.reply(200, 'jun 7, 2019 17:57:18 +00:00');

		getServerTime().then(response => {
			assert(expect(response).not.empty);
		});
	});

	it('check if string it is cutted in the position and added a points', () => {
		const string = setStrLength('Hello', 4);
		expect(string).to.be('Hell...');
	});

	it('check if removed the host of the url', () => {
		const string = stripHost('http://test.vtexcommercestable.com.br/contacto/test');
		expect(string).to.be('/contacto/test');
	});

	it('check if percent discount is correct', () => {
		const lPrice = 100;
		const bPrice = 50;
		expect(calculatePercentDiscount(lPrice, bPrice)).to.be('50%');
	});

	it('check customData get info', () => {
		const data = getCustomDataInfo(customData, 'storepickup', ['data']);
		expect('data' in data).to.be(true);
	});
});
