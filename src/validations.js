/* eslint max-len: ["error", { "ignoreComments": true , "code": 100 }] */
/** @namespace Utils */
/** @namespace Utils.Validations */


/**
 * @function isEmail
 * @description check if a string is a valid email
 * @memberof Utils.Validations
 * @param {string} email - string to check
 * @returns {boolean}
*/
// eslint-disable-next-line
const emailRegex = /^[A-z0-9+_-]+(?:\.[A-z0-9+_-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?$/i;
export const isEmail = email => emailRegex.test(email);


/**
 * @function isURL
 * @description Check if a string is a valid URL
 * @memberof Utils.Validations
 * @param {string} URL - string to check
 * @returns {boolean}
*/
export const isURL = URL => (
	/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(URL) //eslint-disable-line
);


/**
 * @function isJSON
 * @description Check if a string is a valid json
 * @memberof Utils.Validations
 * @param {string} json - string to check
 * @returns {boolean}
*/
export const isJSON = (json) => {
	try {
		JSON.parse(json);
		return true;
	} catch(e) {
		return false;
	}
};


/**
 * @function isRUT
 * @description Validate RUT (Chile)
 * @memberof Utils.Validations
 * @param {string} rut - The rut to validate
 * @returns {boolean}
*/
export const isRUT = (value) => {
	let rut = value;
	if(rut.indexOf('-') > -1) {
		rut = rut.replace(/\./g, '').toUpperCase();
		rut = rut.split('-');

		if(rut.length === 2) {
			const rutNum = rut[0];
			const rutLast = rut[1];

			if(rutLast.length < 3 && /[0-9kK]/g.test(rutLast)) {
				let sum = 0;
				let m = 2;

				for(let i = (rutNum.length - 1); i >= 0; i -= 1) {
					sum += rutNum[i] * m;
					m = (m === 7) ? 2 : m + 1;
				}

				const mod = parseInt(sum / 11, 10);
				const res = sum - (11 * mod);
				let last = 11 - res;

				if(last.toString().length > 2)
					return false;

				if(last === 11)
					last = 0;
				else if(last === 10)
					last = 'K';

				return (last === rutLast);
			}
		}
	}
	return false;
};


/**
 * @function isRUC
 * @description Validate RUC (Perú)
 * @memberof Utils.Validations
 * @param {string} ruc - The ruc to validate
 * @returns {boolean}
*/
export const isRUC = (rucvalue) => {
	let ruc = rucvalue;

	if(typeof ruc === 'number')
		ruc = ruc.toString();

	if(!/[^0-9]+/g.test(ruc) && ruc.length === 11 && typeof ruc === 'string') {
		// 11 dígitos y empieza en 10,15,16,17 o 20
		if(
			!(
				(ruc >= 1e10 && ruc < 11e9)
				|| (ruc >= 15e9 && ruc < 18e9)
				|| (ruc >= 2e10 && ruc < 21e9)
			)
		)
			return false;
		let SUM;
		let i;
		/* eslint-disable */
		for(SUM = -( ruc % 10 < 2), i = 0; i < 11; i++, ruc = ruc / 10 | 0)
			SUM += (ruc % 10) * (i % 7 + (i / 7 | 0) + 1);
		/* eslint-enable */
		return SUM % 11 === 0;
	}

	return false;
};


/**
 * @function isRFC
 * @description Validate RFC (Mexico)
 * @memberof Utils.Validations
 * @param {string} RFC - The RFC to validate
 * @returns {boolean}
*/
export const isRFC = RFC => (
	/[A-Z\{\¡\!\"\#\$\&\%\/\(\)\=]{3,4} ?([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]) ?[A-z0-9]{3}/i.test(RFC) //eslint-disable-line
);
