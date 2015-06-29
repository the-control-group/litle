"use strict";

var util = require('util');
var litle = require('./lib/litle.js')({});

litle.litleOnlineRequest.sale({
	$: {
		id: 'Sale Id',
		reportGroup: 'UI Report Group',
		customerId: 'Customer Id'
	},
	orderId: '1',
	amount: 10010,
	orderSource: 'ecommerce',
	billToAddress: {
		name: 'John Smith',
		addressLine1: '1 Main St.',
		city: 'Burlington',
		state: 'MA',
		zip: '01803-3747',
		country: 'US'
	},
	card: {
		type: 'VI',
		number: '4457010000000009',
		expDate: '0114',
		cardValidationNum: '349'
	}
}, function(err, res){
	console.log(res);
});


litle.litleOnlineRequest.sale({
	$: {
		id: 'Sale Id',
		reportGroup: 'UI Report Group',
		customerId: 'Customer Id'
	},
	orderId: '2',
	amount: 20020,
	orderSource: 'ecommerce',
	billToAddress: {
		name: 'Mike J. Hammer',
		addressLine1: '2 Main St.',
		addressLine2: 'Apt. 222',
		city: 'Riverside',
		state: 'RI',
		zip: '02915',
		country: 'US'
	},
	card: {
		type: 'MC',
		number: '5112010000000003',
		expDate: '0214',
		cardValidationNum: '261',
		authenticationValue: 'BwABBJQ1AgAAA AAgJDUCAAAAAA A='
	}
}, function(err, res){
	console.log(res);
});


litle.litleOnlineRequest.sale({
	$: {
		id: 'Sale Id',
		reportGroup: 'UI Report Group',
		customerId: 'Customer Id'
	},
	orderId: '3',
	amount: 30030,
	orderSource: 'ecommerce',
	billToAddress: {
		name: 'Eileen Jones',
		addressLine1: '3 Main St.',
		city: 'Bloomfield',
		state: 'CT',
		zip: '06002',
		country: 'US'
	},
	card: {
		type: 'DI',
		number: '6011010000000003',
		expDate: '0314',
		cardValidationNum: '758'
	}
}, function(err, res){
	console.log(res);
});


litle.litleOnlineRequest.sale({
	$: {
		id: 'Sale Id',
		reportGroup: 'UI Report Group',
		customerId: 'Customer Id'
	},
	orderId: '4',
	amount: 40040,
	orderSource: 'ecommerce',
	billToAddress: {
		name: 'Bob Black',
		addressLine1: '4 Main St.',
		city: 'Laurel',
		state: 'MD',
		zip: '20708',
		country: 'US'
	},
	card: {
		type: 'AX',
		number: '375001000000005',
		expDate: '0414'
	}
}, function(err, res){
	console.log(res);
});


litle.litleOnlineRequest.sale({
	$: {
		id: 'Sale Id',
		reportGroup: 'UI Report Group',
		customerId: 'Customer Id'
	},
	orderId: '5',
	amount: 50050,
	orderSource: 'ecommerce',
	card: {
		type: 'VI',
		number: '4457010200000007',
		expDate: '0514',
		cardValidationNum: '463',
		authenticationValue: 'BwABBJQ1AgAAA AAgJDUCAAAAAA A='
	}
}, function(err, res){
	console.log(res);
});


litle.litleOnlineRequest.sale({
	$: {
		id: 'Sale Id',
		reportGroup: 'UI Report Group',
		customerId: 'Customer Id'
	},
	orderId: '6',
	amount: 60060,
	orderSource: 'ecommerce',
	billToAddress: {
		name: 'Joe Green',
		addressLine1: '6 Main St.',
		city: 'Derry',
		state: 'NH',
		zip: '03038',
		country: 'US'
	},
	card: {
		type: 'VI',
		number: '4457010100000008',
		expDate: '0614',
		cardValidationNum: '992'
	}
}, function(err, res){
	console.log(res);
});


litle.litleOnlineRequest.sale({
	$: {
		id: 'Sale Id',
		reportGroup: 'UI Report Group',
		customerId: 'Customer Id'
	},
	orderId: '7',
	amount: 70070,
	orderSource: 'ecommerce',
	billToAddress: {
		name: 'Jane Murray',
		addressLine1: '7 Main St.',
		city: 'Amesbury',
		state: 'MA',
		zip: '01913',
		country: 'US'
	},
	card: {
		type: 'MC',
		number: '5112010100000002',
		expDate: '0714',
		cardValidationNum: '251'
	}
}, function(err, res){
	console.log(res);
});


litle.litleOnlineRequest.sale({
	$: {
		id: 'Sale Id',
		reportGroup: 'UI Report Group',
		customerId: 'Customer Id'
	},
	orderId: '8',
	amount: 80080,
	orderSource: 'ecommerce',
	billToAddress: {
		name: 'Mark Johnson',
		addressLine1: '8 Main St.',
		city: 'Manchester',
		state: 'NH',
		zip: '03101',
		country: 'US'
	},
	card: {
		type: 'DI',
		number: '6011010100000002',
		expDate: '0814',
		cardValidationNum: '184'
	}
}, function(err, res){
	console.log(res);
});


litle.litleOnlineRequest.sale({
	$: {
		id: 'Sale Id',
		reportGroup: 'UI Report Group',
		customerId: 'Customer Id'
	},
	orderId: '9',
	amount: 90090,
	orderSource: 'ecommerce',
	billToAddress: {
		name: 'James Miller',
		addressLine1: '9 Main St.',
		city: 'Boston',
		state: 'MA',
		zip: '02134',
		country: 'US'
	},
	card: {
		type: 'AX',
		number: '375001010000003',
		expDate: '0914',
		cardValidationNum: '0421'
	}
}, function(err, res){
	console.log(res);
});


