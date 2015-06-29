'use strict';

var litle = require('../lib/litle.js')({
	user: 'test_user',
	password: 'test_password',
	url: 'https://www.testlitle.com/sandbox/communicator/online'
});
var assert = require('chai').assert;

describe('Litle', function() {

	var token, valid, invalid;
	
	describe('#authorization', function() {
		it('succeeds with a valid card', function(done) {
			litle.litleOnlineRequest.authorization({
				$: {
					id: 'ididid',
					reportGroup: 'rtpGrp',
					customerId: '12345'
				},
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
				assert.isNull(err);
				var authResponse = res.authorizationResponse;
				var tokenResponse = res.authorizationResponse.tokenResponse;
				assert.equal(authResponse.response, '000');
				assert.equal(tokenResponse.tokenResponseCode, '801');
				assert.isDefined(tokenResponse.litleToken);
				valid = authResponse.litleTxnId;
				token = tokenResponse.litleToken;
				done();
			});
		});

		it('fails with an invalid card', function(done) {
			litle.litleOnlineRequest.authorization({
				$: {
					id: 'ididid',
					reportGroup: 'rtpGrp',
					customerId: '12345'
				},
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
				assert.isNull(err);
				var authResponse = res.authorizationResponse;
				var tokenResponse = res.authorizationResponse.tokenResponse;
				assert.equal(authResponse.response, '110');
				assert.isUndefined(tokenResponse);
				invalid = authResponse.litleTxnId;
				done();
			});
		});
	});

	describe('#authorizationReversal', function() {
		it('succeeds with a valid transaction', function(done) {
			litle.litleOnlineRequest.authorizationReversal({
				$: {
					id: 'ididid',
					reportGroup: 'rtpGrp',
					customerId: '12345'
				},
				litleTxnId: valid,
				amount: 50,
			}, function(err, res){
				assert.isNull(err);
				var authReversalResponse = res.authReversalResponse;
				assert.equal(authReversalResponse.response, '000');
				done();
			});
		});
		it('fails with an invalid transaction', function(done) {
			litle.litleOnlineRequest.authorizationReversal({
				$: {
					id: 'ididid',
					reportGroup: 'rtpGrp',
					customerId: '12345'
				},
				litleTxnId: invalid,
				amount: 50,
			}, function(err, res){
				assert.isNull(err);
				var authReversalResponse = res.authReversalResponse;
				assert.equal(authReversalResponse.response, '110');
				done();
			});
		});
	});

	describe('#sale', function() {
		it('succeeds with token', function(done) {
			litle.litleOnlineRequest.sale({
				$: {
					id: 'ididid',
					reportGroup: 'rtpGrp',
					customerId: '12345'
				},
				orderId: '1',
				amount: 10000,
				orderSource: 'ecommerce',
				token: {
					litleToken: token
				}
			}, function(err, res){
				assert.isNull(err);
				var saleResponse = res.saleResponse;
				assert.equal(saleResponse.response, '000');
				valid = saleResponse.litleTxnId;
				done();
			});
		});
		it('tokens can be used multiple times', function(done) {
			litle.litleOnlineRequest.sale({
				$: {
					id: 'ididid',
					reportGroup: 'rtpGrp',
					customerId: '12345'
				},
				orderId: '1',
				amount: 10000,
				orderSource: 'ecommerce',
				token: {
					litleToken: token
				}
			}, function(err, res){
				assert.isNull(err);
				var saleResponse = res.saleResponse;
				assert.equal(saleResponse.response, '000');
				done();
			});
		});
	});

	describe('#credit (refund)', function() {
		it('succeeds with a valid transaction', function(done) {
			litle.litleOnlineRequest.credit({
				$: {
					id: 'ididid',
					reportGroup: 'rtpGrp',
					customerId: '12345'
				},
				litleTxnId: valid,
				amount: 10000,
				token: {
					litleToken: token
				}
			}, function(err, res){
				var creditResponse = res.creditResponse;
				assert.equal(creditResponse.response, '000');
				done();
			});
		});
	});
});