"use strict";

var util = require('util');
var litle = require('./lib/litle.js')({});

// litle.litleOnlineRequest.authorization({
// 	$: {
// 		id: 'ididid',
// 		reportGroup: 'rtpGrp',
// 		customerId: '12345'
// 	},
// 	orderId: '1',
// 	amount: 10000,
// 	orderSource: 'ecommerce',
// 	billToAddress: {
// 		name: 'Jane Doe',
// 		addressLine1: '20 Main Street',
// 		city: 'San Jose',
// 		state: 'CA',
// 		zip: '95032',
// 		country: 'USA',
// 		phone: '978-551-0040'
// 	},
// 	card: {
// 		type: 'MC',
// 		number: '4100280190123000',
// 		expDate: '1112',
// 		cardValidationNum: '123'
// 	}
// }, function(err, res){
// 	console.log(err, res);
// });


litle.litleOnlineRequest.sale({
	$: {
		id: 'ididid',
		reportGroup: 'rtpGrp',
		customerId: '12345'
	},
	orderId: '1',
	amount: 10000,
	orderSource: 'ecommerce',
	billToAddress: {
		name: 'Jane Doe',
		addressLine1: '20 Main Street',
		city: 'San Jose',
		state: 'CA',
		zip: '95032',
		country: 'USA',
		phone: '978-551-0040'
	},
	card: {
		type: 'VI',
		number: '4100280190123000',
		expDate: '1112',
		cardValidationNum: '123'
	}
}, function(err, res){
	console.log(err, res);
});


// litle.litleOnlineRequest.registerTokenRequest({
// 	$: {
// 		id: 'Id',
// 		reportGroup: "UI Report Group"
// 	},
// 	orderId: "Order Id",
// 	accountNumber: "4100280190123000",
// 	cardValidationNum: '123'
// }, function(err, res){
// 	console.log(err, res)
// })


