/* eslint-env mocha */

import { isEmail, isJSON, isRUT, isRUC, isRFC } from '../src';

const expect = require('expect.js');

describe('Test validations utils', () => {
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
});
