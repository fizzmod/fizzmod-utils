import customData from '../src/__mocks__/customData';
import {
	setCurrency,
	formatPrice,
	sanitizeString,
	getResizedImage,
	setStrLength,
	calculatePercentDiscount,
	stripHost,
	isEmail,
	isJSON,
	isRUT,
	isRUC,
	isRFC,
	getCustomDataInfo
} from '../src';

const expect = require('expect.js');

describe('Test functions utils', () => {

	it('check if set correct a currency', () => {
		setCurrency('S/');
		const price = formatPrice(100);
		expect(price).to.be('S/100,00');
	});

	it('check if sanitize correct', () => {
		const string = sanitizeString('Hello world jaja');
		expect(string).to.be('hello-world-jaja');
	});

	it('check if image is resized correctly', () => {
		const url = getResizedImage('http://fizzmod.vteximg.com.br/arquivos/ids/155242-292-292/image.png', 150, 150);
		expect(url).to.be('http://fizzmod.vteximg.com.br/arquivos/ids/155242-150-150/image.png');
	});

	it('check if string it is cutted in the position and added a points', () => {
		const string = setStrLength('Hello', 4);
		expect(string).to.be('Hell...');
	});

	it('check if removed the host of the url', () => {
		const string = stripHost('http://test.vtexcommercestable.com.br/contacto/test');
		expect(string).to.be('/contacto/test');
	});

	it('check if email it is valid', () => {
		const email = isEmail('juancho@test.com');
		expect(email).to.be(true);
	});

	it('check if email it is not valid', () => {
		const email = isEmail('juancho@test');
		expect(email).to.be(false);
	});

	it('check if json it is valid', () => {
		const json = '{"test": "test"}';
		expect(isJSON(json)).to.be(true);
	});

	it('check if json it is not valid', () => {
		const json = '{"test": "test", "asdasd"}';
		expect(isJSON(json)).to.be(false);
	});

	it('check if RUT it is valid', () => {
		const rut = '34297936-K';
		expect(isRUT(rut)).to.be(true);
	});

	it('check if RUT it is not valid', () => {
		const rut = '34.297.936-L';
		expect(isRUT(rut)).to.be(false);
	});

	it('check if RUC it is valid', () => {
		const ruc = '10164181826';
		expect(isRUC(ruc)).to.be(true);
	});

	it('check if RUC it is not valid', () => {
		const ruc = '1016409058';
		expect(isRUC(ruc)).to.be(false);
	});

	it('check if RFC it is valid', () => {
		const RFC = 'CUPU800825569';
		expect(isRFC(RFC)).to.be(true);
	});

	it('check if RFC it is not valid', () => {
		const RFC = 'CUPU80082556';
		expect(isRFC(RFC)).to.be(false);
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
})
