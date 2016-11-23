'use strict';

var litle = require('../lib/Litle.js')({
	user: 'test_user',
	password: 'test_password',
	url: 'https://www.testlitle.com/sandbox/communicator/online',
	version: '9.10'
});
var assert = require('chai').assert;

describe('Litle v9.10', function() {

	var token;
	var validAuth, validCapture, validSale;

	describe('#registerTokenRequest', function() {
		it('succeeds with a valid card', function(done) {
			litle.litleOnlineRequest.registerTokenRequest({
				id: 'ididid',
				reportGroup: 'rtpGrp',
				accountNumber: "4100280190123000"
			}, function(err, res){
				if (err) return done(err);
				var tokenResponse = res.registerTokenResponse;
				assert.strictEqual(tokenResponse.response, '000');
				assert.strictEqual(tokenResponse.litleToken, '1111222233334444');
				done();
			});
		});
	});

	describe('#authorization', function() {
		it('succeeds with a valid card', function(done) {
			litle.litleOnlineRequest.authorization({
				id: 'ididid',
				reportGroup: 'rtpGrp',
				customerId: '12345',
				orderId: '1',
				amount: 50,
				orderSource: 'ecommerce',
				card: {
					type: 'MC',
					number: '4100280190123000',
					expDate: '1112',
					cardValidationNum: '123'
				}
			}, function(err, res){
				if(err) return done(err);
				var authResponse = res.authorizationResponse;
				var tokenResponse = res.authorizationResponse.tokenResponse;
				assert.isString(authResponse.litleTxnId);
				assert.strictEqual(authResponse.response, '000');
				assert.strictEqual(tokenResponse.tokenResponseCode, '801');
				assert.isDefined(tokenResponse.litleToken);
				validAuth = authResponse.litleTxnId;
				token = tokenResponse.litleToken;
				done();
			});
		});

		it('fails with an invalid card', function(done) {
			litle.litleOnlineRequest.authorization({
				id: 'ididid',
				reportGroup: 'rtpGrp',
				customerId: '12345',
				orderId: '1',
				amount: 50,
				orderSource: 'ecommerce',
				card: {
					type: 'MC',
					number: '4488282659650110',
					expDate: '1112',
					cardValidationNum: '123'
				}
			}, function(err, res){
				if(err) return done(err);
				var authResponse = res.authorizationResponse;
				var tokenResponse = res.authorizationResponse.tokenResponse;
				assert.strictEqual(authResponse.response, '110');
				assert.isUndefined(tokenResponse);
				done();
			});
		});
	});

	describe('#authReversal', function() {
		it('succeeds with a valid transaction', function(done) {
			litle.litleOnlineRequest.authReversal({
				id: 'ididid',
				reportGroup: 'rtpGrp',
				customerId: '12345',
				litleTxnId: validAuth,
				amount: 50,
			}, function(err, res){
				if(err) return done(err);
				var authReversalResponse = res.authReversalResponse;
				assert.strictEqual(authReversalResponse.response, '000');
				done();
			});
		});
	});

	describe('#capture', function() {
		before(function(done) {
			litle.litleOnlineRequest.authorization({
				id: 'ididid',
				reportGroup: 'rtpGrp',
				customerId: '12345',
				orderId: '1',
				amount: 50,
				orderSource: 'ecommerce',
				card: {
					type: 'MC',
					number: '4100280190123000',
					expDate: '1112',
					cardValidationNum: '123'
				}
			}, function(err, res){
				if(err) return done(err);
				var authResponse = res.authorizationResponse;
				var tokenResponse = res.authorizationResponse.tokenResponse;
				assert.isString(authResponse.litleTxnId);
				assert.strictEqual(authResponse.response, '000');
				assert.strictEqual(tokenResponse.tokenResponseCode, '801');
				assert.isDefined(tokenResponse.litleToken);
				validCapture = authResponse.litleTxnId;
				token = tokenResponse.litleToken;
				done();
			});
		});

		it('succeeds with a valid auth', function(done) {
			litle.litleOnlineRequest.capture({
				id: 'ididid',
				reportGroup: 'rtpGrp',
				litleTxnId: validCapture,
			}, function(err, res){
				if(err) return done(err);
				var captureResponse = res.captureResponse;
				var tokenResponse = res.captureResponse.tokenResponse;
				assert.isString(captureResponse.litleTxnId);
				assert.strictEqual(captureResponse.response, '000');
				assert.isUndefined(tokenResponse);
				validCapture = captureResponse.litleTxnId;
				done();
			});
		});
	});

	describe('#sale', function() {
		it('succeeds with token', function(done) {
			litle.litleOnlineRequest.sale({
				id: 'ididid',
				reportGroup: 'rtpGrp',
				customerId: '12345',
				orderId: '1',
				amount: 10000,
				orderSource: 'ecommerce',
				token: {
					litleToken: token
				},
				customBilling: {
					phone: '18008008378',
					descriptor: 'TEST'
				}
			}, function(err, res){
				if(err) return done(err);
				var saleResponse = res.saleResponse;
				assert.strictEqual(saleResponse.response, '000');
				validSale = saleResponse.litleTxnId;
				done();
			});
		});
		it('tokens can be used multiple times', function(done) {
			litle.litleOnlineRequest.sale({
				id: 'ididid',
				reportGroup: 'rtpGrp',
				customerId: '12345',
				orderId: '1',
				amount: 10000,
				orderSource: 'ecommerce',
				token: {
					litleToken: token
				},
				customBilling: {
					phone: '18008008378',
					descriptor: 'TEST'
				}
			}, function(err, res){
				if(err) return done(err);
				var saleResponse = res.saleResponse;
				assert.strictEqual(saleResponse.response, '000');
				done();
			});
		});
	});

	describe('#credit', function() {
		it('succeeds with a valid transaction', function(done) {
			litle.litleOnlineRequest.credit({
				id: 'ididid',
				reportGroup: 'rtpGrp',
				litleTxnId: '3457689986756',
				amount: 10000
			}, function(err, res){
				if(err) return done(err);
				var creditResponse = res.creditResponse;
				assert.strictEqual(creditResponse.response, '000');
				done();
			});
		});
	});
});
