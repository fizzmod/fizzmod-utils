import axios from 'axios';

/* eslint max-len: ["error", { "ignoreComments": true , "code": 100 }] */
/** @namespace Utils */
/** @namespace Utils.Functions */


const Utils = {
	currency: null,
	animationCallbacks: []
};


/**
 * @function setCurrency
 * @description Sets the currency that will be used by helper functions
 * @memberof Utils.Functions
 * @param {string} currency - The currency
*/
export const setCurrency = (currency) => {
	Utils.currency = currency;
};


/**
 * @function formatPrice
 * @description Formats a number
 * @memberof Utils.Functions
 * @param {number|string} number - The number to format
 * @param {string} [thousands="."] - thousands delimiter
 * @param {string} [decimals=","] - decimal delimiter
 * @param {integer} [length=2] - length of decimal
 * @param {string} [currency] - If true, the currency setted with Utils.setCurrency("$") will be added, if a currency (string) is passed it will use that instead;
 * @returns {string} The formatted price
*/
export const formatPrice = (number, thousands, decimals, length, currency) => {
	const utilsCurrency = Utils.currency ? Utils.currency : '';
	const newCurrency = (currency && typeof currency === 'string') ? currency : utilsCurrency;
	const newLength = typeof length !== 'number' ? 2 : length;

	const re = `\\d(?=(\\d{3})+${newLength > 0 ? '\\D' : '$'})`;
	const regex = new RegExp(re, 'g');
	let newNumber = (number * 1).toFixed(Math.max(0, ~~newLength)).toString(); // eslint-disable-line
	if(typeof newNumber !== 'string')
		newNumber = newNumber.toString();

	newNumber = newNumber.replace('.', (decimals || ','));
	newNumber = newNumber.replace(regex, `$&${thousands || '.'}`);

	if(/€/g.test(newCurrency))
		return newNumber + newCurrency;

	return newCurrency + newNumber;
};


/**
 * @function sanitizeString
 * @description Sanitize a string, removing/replacing all special characters and spaces with underscore
 * @memberof Utils.Functions
 * @param {string} str - The string to sanitize
 * @param {string} [replace="-"] - The string to replace white spaces with, default "-"
 * @returns {string} The modified string
 * @example Utils.sanitizeString("hóla múndo"); //Output "hola-mundo"
*/
export const sanitizeString = (str, rp) => {
	const replace = typeof rp === 'string' ? rp : '-';
	let string = str.toLowerCase();
	string = string.replace(/[\[\]\(\)\-\{\}\^\,]/g, ''); // eslint-disable-line
	string = string.replace(/[àáâãäåª]/g, 'a');
	string = string.replace(/[éèëê]/g, 'e');
	string = string.replace(/[íìïî]/g, 'i');
	string = string.replace(/[óòöô]/g, 'o');
	string = string.replace(/[úùüû]/g, 'u');
	string = string.replace(/[ñ]/g, 'n');
	string = string.replace(/[ç]/g, 'c');
	string = string.replace(/ /g, replace);
	return string;
};


/**
 * @function getResizedImage
 * @description Change the width & height from a given VTEX image source
 * @memberof Utils.Functions
 * @param {string} src - The source of the image
 * @param {int|string} width - The new image with
 * @param {int|string} height - The new image height
 * @returns {string} The resized image source
 * @example
 * //Given an image thumb source
 * Fizzmod.Utils.getResizedImage('http://fizzmod.vteximg.com.br/arquivos/ids/155242-292-292/image.png', 500, 600);
 * //Output: http://fizzmod.vteximg.com.br/arquivos/ids/155242-500-600/image.png
 *
 * //Given a full image source
 * Fizzmod.Utils.getResizedImage('http://fizzmod.vteximg.com.br/arquivos/ids/155242/image.png', 100, 100);
 * //Output: http://fizzmod.vteximg.com.br/arquivos/ids/155242-100-100/image.png
*/
export const getResizedImage = (src, width, height) => {
	if(width === undefined || height === undefined || typeof src !== 'string')
		return src;

	const pattern = /(?:ids\/[0-9]+)-([0-9]+)-([0-9]+)\//;

	const newSrc = src.replace(pattern, (match, matchedWidth, matchedHeight) => (
		match.replace(`-${matchedWidth}-${matchedHeight}`, `-${width}-${height}`)
	));

	return newSrc.replace(/(ids\/[0-9]+)\//, `$1-${width}-${height}/`);
};


/**
 * set a cookie
 * @function setCookie
 * @memberof Utils.Functions
 * @param {string} cname - The name of the cookie
 * @param {mixed} cvalue - The value of the cookie, if the value is an object, it will be JSON encoded
 * @param {int} [exdays] - Expiration days, if not set the cookie will last through the session only
 * @param {bool} [isdomain] - Set as domain cookie. (Default false, adding "." before the url.)
 * @returns {void}
*/
export const setCookie = (cname, cvalue, exdays, isdomain = false) => {
	let expires = '';
	const value = typeof cvalue === 'object' ? JSON.stringify(cvalue) : cvalue;

	if(!Number.isNaN(exdays)) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		expires = `expires=${d.toGMTString()};`;
	}

	if(isdomain)
		document.cookie = `${cname}=${value}; ${expires}path=/`;
	else
		document.cookie = `${cname}=${value};domain=.${window.location.host}; ${expires}path=/`;
};


/**
 * @function getCookie
 * @memberof Utils.Functions
 * @param {string} cname - The name of the cookie to get
 * @returns {string} - The cookie value
*/
export const getCookie = (cname) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${cname}=`);
	if(parts.length === 2)
		return parts.pop().split(';').shift();
	return '';
};


/**
 * @function deleteCookie
 * @description Remove cookie in docmuent
 * @memberof Utils.Functions
 * @param {string} cname - The name of the cookie to delete
 * @returns {void}
*/
export const deleteCookie = cname => setCookie(cname, '', -1);


/**
* @function addAnimation
* @description Add an animation listener for the given animation name
* @memberof Utils.Functions
* @param {string} name - The animation name
* @param {function} callback - The animation callback
* @example
* Fizzmod.Utils.addAnimation('nodeInserted', myFunction);
*/
export const addAnimation = (name, callback) => {
	const { animationCallbacks } = Utils;
	const listenerCallback = (e) => {
		if(e.animationName in animationCallbacks) {
			// eslint-disable-next-line
			for(let i = 0, animationLength = animationCallbacks[e.animationName].length; i < animationLength; i += 1)
				animationCallbacks[e.animationName][i].call(null, e);
		}
	};

	if(!Object.keys(animationCallbacks).length) {
		document.addEventListener('animationstart', listenerCallback);
		document.addEventListener('webkitAnimationStart', listenerCallback);
		document.addEventListener('MSAnimationStart', listenerCallback);
		document.addEventListener('oAnimationStart', listenerCallback);
		document.addEventListener('mozAnimationStart', listenerCallback);
	}
	if(!(animationCallbacks[name] instanceof Array))
		animationCallbacks[name] = [];

	animationCallbacks[name].push(callback);
};


/**
 * @function setStrLength
 * @memberof Utils.Functions
 * @param {string} str
 * @param {number} maxLength - default 27
 * @description slice string if string is greater than maxLength
 * @returns new string with three dots
 * @example Utils.setStrLength('Fizzmod', 3) // Fizz...
*/
export const setStrLength = (str, maxLength = 27) => {
	if(!str)
		return;
	return (str.length >= maxLength) ? `${str.slice(0, maxLength)}...` : str;
};


/**
 * @function stripHost
 * @description Removes the host from an URL
 * @memberof Utils.Functions
 * @param {string} URL - The URL
 * @returns {string} The modified string
 * @example Utils.stripHost("http://test.vtexcommercestable.com.br/contacto/test"); //  "/contacto/test"
 */
export const stripHost = url => url.toString().replace(/https?:\/\/.*?\//i, '/');


/**
 * @function detectIE
 * @description Check whether the browser is IE and return the version if so.
 * @memberof Utils.Functions
 * @returns {string|false} The IE version or false if other browser
*/
export const detectIE = () => {
	const ua = window.navigator.userAgent;

	const msie = ua.indexOf('MSIE ');
	if(msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	const trident = ua.indexOf('Trident/');
	if(trident > 0) {
		// IE 11 => return version number
		const rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	const edge = ua.indexOf('Edge/');
	if(edge > 0) {
		// IE 12 => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
};

/**
 * @function calculatePercentDiscount
 * @memberof Utils.Functions 
 * @description calculates discount percentage between two prices.
 * @param {number} listprice - Number price of list
 * @param {number} bestprice - Number price for selling
 * @returns {string} - Return percent discunt rounded in Price
 * @example Utils.calculatePercentDiscount(100, 50) // 50%
*/
export const calculatePercentDiscount = (listprice, bestprice) => {
	const lPrice = parseInt(listprice, 10);
	const bPrice = parseInt(bestprice, 10);
	const percentDiscount = ((lPrice - bPrice) / lPrice) * 100;
	return `${Math.round(percentDiscount)}%`;
};

/**
 * @function isGoogleMapLoaded
 * @memberof Utils.Functions 
 * @description Check if google mao is loadedd
 * @returns {boolean}
*/
export const isGoogleMapLoaded = () => (
	typeof window.google !== 'undefined' && typeof window.google.maps !== 'undefined'
);

/**
 * @description Get the VTEX server time
 * @memberof Utils.Functions 
 * @function getServerTime
 * @returns {Promise}
*/
export const getServerTime = async() => {
	const response = await axios.get('/no-cache/HoraAtualServidor.aspx');

	const monthBr = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

	const time = response.match(/([0-9]+):([0-5][0-9]):([0-5][0-9])/)[0];
	let day = parseInt(response.match(/[a-z]{3} ([0-9]{1,2})/)[1], 10);
	let month = monthBr.indexOf(response.match(/[a-z]{3}/)[0]) + 1;
	const year = parseInt(response.match(/[0-9]{4}/)[0], 10);

	if(day < 10)
		day = `0${day}`;

	if(month < 10)
		month = `0${month}`;

	return new Date(`${year}/${month}/${day} ${time}`);
};

/**
 * @function getCustomDataInfo
 * @memberof Utils.Functions
 * @description Function for get info into especific fields in app into customData
 * @param {object} customData - customData object into orderForm
 * @param {string} appName - CustomData App name
 * @param {array} fieldsToSearch - Array of string with CustomData app fields names
 * @returns {object|null}
*/
export const getCustomDataInfo = (customData, appName, fieldsToSearch) => {
	try {

		if(!(customData && customData instanceof Object && !(customData instanceof Array)))
			throw 'Customdata invalid';
		if(!(appName && typeof appName === 'string'))
			throw 'appName invalid';
		if(!(fieldsToSearch && fieldsToSearch instanceof Array && fieldsToSearch.every(e => typeof e === 'string')))
			throw 'fieldsToSearch invalid';

		if('customApps' in customData) {
			const { customApps } = customData;
			if(customApps.length) {
				const objSearch = customApps.find(app => appName === app.id);
				
				if(!objSearch)
					throw `appName '${appName}' not found`;

				const { fields } = objSearch;
				
				if(fieldsToSearch instanceof Array) {
					const data = fieldsToSearch.reduce((acccum, fieldName) => {
						const accumulator = Object.assign({}, acccum);

						if(fields[fieldName])
							accumulator[fieldName] = fields[fieldName];

						return accumulator;
					}, {});

					if(!Object.keys(data).length)
						throw `not found any 'fieldsToSearch'`;

					return data;
				}
			}
		}
	} catch(error) {
		console.error(new Error(error));
		return null;
	}
};

