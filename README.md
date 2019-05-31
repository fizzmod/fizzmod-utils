# fizzmod-utils

Funciones utiles para desarrollar un ecommerce en vtex

## Install

```bash
npm install --save fizzmod-utils
```

<a name="Utils"></a>

## Utils : <code>object</code>
**Kind**: global namespace  

* [Utils](#Utils) : <code>object</code>
    * [.Functions](#Utils.Functions) : <code>object</code>
        * [.setCurrency(currency)](#Utils.Functions.setCurrency)
        * [.formatPrice(number, [thousands], [decimals], [length], [currency])](#Utils.Functions.formatPrice) ⇒ <code>string</code>
        * [.sanitizeString(str, [replace])](#Utils.Functions.sanitizeString) ⇒ <code>string</code>
        * [.getResizedImage(src, width, height)](#Utils.Functions.getResizedImage) ⇒ <code>string</code>
        * [.setCookie(cname, cvalue, [exdays], [isdomain])](#Utils.Functions.setCookie) ⇒ <code>void</code>
        * [.getCookie(cname)](#Utils.Functions.getCookie) ⇒ <code>string</code>
        * [.deleteCookie(cname)](#Utils.Functions.deleteCookie) ⇒ <code>void</code>
        * [.addAnimation(name, callback)](#Utils.Functions.addAnimation)
        * [.setStrLength(str, maxLength)](#Utils.Functions.setStrLength) ⇒
        * [.stripHost(URL)](#Utils.Functions.stripHost) ⇒ <code>string</code>
        * [.detectIE()](#Utils.Functions.detectIE) ⇒ <code>string</code> \| <code>false</code>
        * [.calculatePercentDiscount(listprice, bestprice)](#Utils.Functions.calculatePercentDiscount) ⇒ <code>string</code>
        * [.isGoogleMapLoaded()](#Utils.Functions.isGoogleMapLoaded) ⇒ <code>boolean</code>
        * [.getServerTime()](#Utils.Functions.getServerTime) ⇒ <code>Promise</code>
        * [.getCustomDataInfo(customData, appName, fieldsToSearch)](#Utils.Functions.getCustomDataInfo) ⇒ <code>object</code> \| <code>null</code>
    * [.Validations](#Utils.Validations) : <code>object</code>
        * [.isEmail(email)](#Utils.Validations.isEmail) ⇒ <code>boolean</code>
        * [.isURL(URL)](#Utils.Validations.isURL) ⇒ <code>boolean</code>
        * [.isJSON(json)](#Utils.Validations.isJSON) ⇒ <code>boolean</code>
        * [.isRUT(rut)](#Utils.Validations.isRUT) ⇒ <code>boolean</code>
        * [.isRUC(ruc)](#Utils.Validations.isRUC) ⇒ <code>boolean</code>
        * [.isRFC(RFC)](#Utils.Validations.isRFC) ⇒ <code>boolean</code>

<a name="Utils.Functions"></a>

### Utils.Functions : <code>object</code>
**Kind**: static namespace of [<code>Utils</code>](#Utils)  

* [.Functions](#Utils.Functions) : <code>object</code>
    * [.setCurrency(currency)](#Utils.Functions.setCurrency)
    * [.formatPrice(number, [thousands], [decimals], [length], [currency])](#Utils.Functions.formatPrice) ⇒ <code>string</code>
    * [.sanitizeString(str, [replace])](#Utils.Functions.sanitizeString) ⇒ <code>string</code>
    * [.getResizedImage(src, width, height)](#Utils.Functions.getResizedImage) ⇒ <code>string</code>
    * [.setCookie(cname, cvalue, [exdays], [isdomain])](#Utils.Functions.setCookie) ⇒ <code>void</code>
    * [.getCookie(cname)](#Utils.Functions.getCookie) ⇒ <code>string</code>
    * [.deleteCookie(cname)](#Utils.Functions.deleteCookie) ⇒ <code>void</code>
    * [.addAnimation(name, callback)](#Utils.Functions.addAnimation)
    * [.setStrLength(str, maxLength)](#Utils.Functions.setStrLength) ⇒
    * [.stripHost(URL)](#Utils.Functions.stripHost) ⇒ <code>string</code>
    * [.detectIE()](#Utils.Functions.detectIE) ⇒ <code>string</code> \| <code>false</code>
    * [.calculatePercentDiscount(listprice, bestprice)](#Utils.Functions.calculatePercentDiscount) ⇒ <code>string</code>
    * [.isGoogleMapLoaded()](#Utils.Functions.isGoogleMapLoaded) ⇒ <code>boolean</code>
    * [.getServerTime()](#Utils.Functions.getServerTime) ⇒ <code>Promise</code>
    * [.getCustomDataInfo(customData, appName, fieldsToSearch)](#Utils.Functions.getCustomDataInfo) ⇒ <code>object</code> \| <code>null</code>




<a name="Utils.Functions.setCurrency"></a>

#### Functions.setCurrency(currency)
Sets the currency that will be used by helper functions

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  

| Param | Type | Description |
| --- | --- | --- |
| currency | <code>string</code> | The currency |

<a name="Utils.Functions.formatPrice"></a>

#### Functions.formatPrice(number, [thousands], [decimals], [length], [currency]) ⇒ <code>string</code>
Formats a number

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  
**Returns**: <code>string</code> - The formatted price  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| number | <code>number</code> \| <code>string</code> |  | The number to format |
| [thousands] | <code>string</code> | <code>&quot;\&quot;.\&quot;&quot;</code> | thousands delimiter |
| [decimals] | <code>string</code> | <code>&quot;\&quot;,\&quot;&quot;</code> | decimal delimiter |
| [length] | <code>integer</code> | <code>2</code> | length of decimal |
| [currency] | <code>string</code> |  | If true, the currency setted with Utils.setCurrency("$") will be added, if a currency (string) is passed it will use that instead; |

<a name="Utils.Functions.sanitizeString"></a>

#### Functions.sanitizeString(str, [replace]) ⇒ <code>string</code>
Sanitize a string, removing/replacing all special characters and spaces with underscore

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  
**Returns**: <code>string</code> - The modified string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| str | <code>string</code> |  | The string to sanitize |
| [replace] | <code>string</code> | <code>&quot;\&quot;-\&quot;&quot;</code> | The string to replace white spaces with, default "-" |

**Example**  
```js
Utils.sanitizeString("hóla múndo"); //Output "hola-mundo"
```
<a name="Utils.Functions.getResizedImage"></a>

#### Functions.getResizedImage(src, width, height) ⇒ <code>string</code>
Change the width & height from a given VTEX image source

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  
**Returns**: <code>string</code> - The resized image source  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | The source of the image |
| width | <code>int</code> \| <code>string</code> | The new image with |
| height | <code>int</code> \| <code>string</code> | The new image height |

**Example**  
```js
//Given an image thumb source
Fizzmod.Utils.getResizedImage('http://fizzmod.vteximg.com.br/arquivos/ids/155242-292-292/image.png', 500, 600);
//Output: http://fizzmod.vteximg.com.br/arquivos/ids/155242-500-600/image.png

//Given a full image source
Fizzmod.Utils.getResizedImage('http://fizzmod.vteximg.com.br/arquivos/ids/155242/image.png', 100, 100);
//Output: http://fizzmod.vteximg.com.br/arquivos/ids/155242-100-100/image.png
```
<a name="Utils.Functions.setCookie"></a>

#### Functions.setCookie(cname, cvalue, [exdays], [isdomain]) ⇒ <code>void</code>
set a cookie

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  

| Param | Type | Description |
| --- | --- | --- |
| cname | <code>string</code> | The name of the cookie |
| cvalue | <code>mixed</code> | The value of the cookie, if the value is an object, it will be JSON encoded |
| [exdays] | <code>int</code> | Expiration days, if not set the cookie will last through the session only |
| [isdomain] | <code>bool</code> | Set as domain cookie. (Default false, adding "." before the url.) |

<a name="Utils.Functions.getCookie"></a>

#### Functions.getCookie(cname) ⇒ <code>string</code>
**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  
**Returns**: <code>string</code> - - The cookie value  

| Param | Type | Description |
| --- | --- | --- |
| cname | <code>string</code> | The name of the cookie to get |

<a name="Utils.Functions.deleteCookie"></a>

#### Functions.deleteCookie(cname) ⇒ <code>void</code>
Remove cookie in docmuent

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  

| Param | Type | Description |
| --- | --- | --- |
| cname | <code>string</code> | The name of the cookie to delete |

<a name="Utils.Functions.addAnimation"></a>

#### Functions.addAnimation(name, callback)
Add an animation listener for the given animation name

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The animation name |
| callback | <code>function</code> | The animation callback |

**Example**  
```js
Fizzmod.Utils.addAnimation('nodeInserted', myFunction);
```
<a name="Utils.Functions.setStrLength"></a>

#### Functions.setStrLength(str, maxLength) ⇒
slice string if string is greater than maxLength

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  
**Returns**: new string with three dots  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> |  |
| maxLength | <code>number</code> | default 27 |

**Example**  
```js
Utils.setStrLength('Fizzmod', 3) // Fizz...
```
<a name="Utils.Functions.stripHost"></a>

#### Functions.stripHost(URL) ⇒ <code>string</code>
Removes the host from an URL

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  
**Returns**: <code>string</code> - The modified string  

| Param | Type | Description |
| --- | --- | --- |
| URL | <code>string</code> | The URL |

**Example**  
```js
Utils.stripHost("http://test.vtexcommercestable.com.br/contacto/test"); //  "/contacto/test"
```
<a name="Utils.Functions.detectIE"></a>

#### Functions.detectIE() ⇒ <code>string</code> \| <code>false</code>
Check whether the browser is IE and return the version if so.

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  
**Returns**: <code>string</code> \| <code>false</code> - The IE version or false if other browser  
<a name="Utils.Functions.calculatePercentDiscount"></a>

#### Functions.calculatePercentDiscount(listprice, bestprice) ⇒ <code>string</code>
calculates discount percentage between two prices.

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  
**Returns**: <code>string</code> - - Return percent discunt rounded in Price  

| Param | Type | Description |
| --- | --- | --- |
| listprice | <code>number</code> | Number price of list |
| bestprice | <code>number</code> | Number price for selling |

**Example**  
```js
Utils.calculatePercentDiscount(100, 50) // 50%
```
<a name="Utils.Functions.isGoogleMapLoaded"></a>

#### Functions.isGoogleMapLoaded() ⇒ <code>boolean</code>
Check if google mao is loadedd

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  
<a name="Utils.Functions.getServerTime"></a>

#### Functions.getServerTime() ⇒ <code>Promise</code>
Get the VTEX server time

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  
<a name="Utils.Functions.getCustomDataInfo"></a>

#### Functions.getCustomDataInfo(customData, appName, fieldsToSearch) ⇒ <code>object</code> \| <code>null</code>
Function for get info into especific fields in app into customData

**Kind**: static method of [<code>Functions</code>](#Utils.Functions)  

| Param | Type | Description |
| --- | --- | --- |
| customData | <code>object</code> | customData object into orderForm |
| appName | <code>string</code> | CustomData App name |
| fieldsToSearch | <code>array</code> | Array of string with CustomData app fields names |

<a name="Utils.Validations"></a>

### Utils.Validations : <code>object</code>
**Kind**: static namespace of [<code>Utils</code>](#Utils)  

* [.Validations](#Utils.Validations) : <code>object</code>
    * [.isEmail(email)](#Utils.Validations.isEmail) ⇒ <code>boolean</code>
    * [.isURL(URL)](#Utils.Validations.isURL) ⇒ <code>boolean</code>
    * [.isJSON(json)](#Utils.Validations.isJSON) ⇒ <code>boolean</code>
    * [.isRUT(rut)](#Utils.Validations.isRUT) ⇒ <code>boolean</code>
    * [.isRUC(ruc)](#Utils.Validations.isRUC) ⇒ <code>boolean</code>
    * [.isRFC(RFC)](#Utils.Validations.isRFC) ⇒ <code>boolean</code>

<a name="Utils.Validations.isEmail"></a>

#### Validations.isEmail(email) ⇒ <code>boolean</code>
check if a string is a valid email

**Kind**: static method of [<code>Validations</code>](#Utils.Validations)  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | string to check |

<a name="Utils.Validations.isURL"></a>

#### Validations.isURL(URL) ⇒ <code>boolean</code>
Check if a string is a valid URL

**Kind**: static method of [<code>Validations</code>](#Utils.Validations)  

| Param | Type | Description |
| --- | --- | --- |
| URL | <code>string</code> | string to check |

<a name="Utils.Validations.isJSON"></a>

#### Validations.isJSON(json) ⇒ <code>boolean</code>
Check if a string is a valid json

**Kind**: static method of [<code>Validations</code>](#Utils.Validations)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>string</code> | string to check |

<a name="Utils.Validations.isRUT"></a>

#### Validations.isRUT(rut) ⇒ <code>boolean</code>
Validate RUT (Chile)

**Kind**: static method of [<code>Validations</code>](#Utils.Validations)  

| Param | Type | Description |
| --- | --- | --- |
| rut | <code>string</code> | The rut to validate |

<a name="Utils.Validations.isRUC"></a>

#### Validations.isRUC(ruc) ⇒ <code>boolean</code>
Validate RUC (Perú)

**Kind**: static method of [<code>Validations</code>](#Utils.Validations)  

| Param | Type | Description |
| --- | --- | --- |
| ruc | <code>string</code> | The ruc to validate |

<a name="Utils.Validations.isRFC"></a>

#### Validations.isRFC(RFC) ⇒ <code>boolean</code>
Validate RFC (Mexico)

**Kind**: static method of [<code>Validations</code>](#Utils.Validations)  

| Param | Type | Description |
| --- | --- | --- |
| RFC | <code>string</code> | The RFC to validate |
