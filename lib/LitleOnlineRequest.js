'use strict';

var _ = require('lodash');
var url = require('url');
var https = require('https');
var xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitArray: false});
var builder = new xml2js.Builder({explicitArray: false});

var services = ['virtualGiftcard', 'createPlan', 'updatePlan', 'cancelSubscription', 'updateSubscription', 'activate', 'deactivate', 'loadRequest', 'unloadRequest', 'balanceInquiry', 'activateReversal', 'depositReversal', 'refundReversal', 'deactivateReversal', 'loadReversal', 'unloadReversal', 'authorization', 'sale', 'authReversal', 'credit', 'registerTokenRequest', 'updateCardValidationNumOnToken', 'forceCapture', 'capture', 'captureGivenAuth', 'void', 'echeckRedeposit', 'echeckSale', 'echeckCredit', 'echeckVerification', 'echeckVoid', 'addAccountInfo', 'buildRequest', 'commit', 'configureConnection', 'getMerchantId', 'getMerchantSdk', 'getReportGroup', 'getConfig', 'getLoggedInUser'];


function map(m, data){
	var result = {};
	_.each(m, function(v, property){
		if(!data[property]) return;
		return (result[property] = (typeof v == 'boolean') ? data[property] : map(v, data[property]));
	});

	return result;
}

function actionFactory(action){
	return function(data, callback){
		var body = {}; body[action] = data;
		return this._send(body, callback);
	};
}

function LitleOnlineRequest(config){
	var root = 'litleOnlineRequest';
	var options = {};

	// allow explicit options
	var self = Object.create(LitleOnlineRequest.prototype, function self(o){
		options = o;
		return self;
	});

	// send a built request
	self._send = function send(data, callback){

		// because Litle is stupid and their schema
		// requires XML properties in a specific order,
		// we must reconstruct the data in said order before
		// converting to XML and sending. STUPID STUPID.

		data = _.extend({
			// set top level attributes
			$: {
				version: config.version,
				xmlns: 'http://www.litle.com/schema',
				merchantId: config.merchantId || config.currency_merchant_map.DEFAULT
			},

			// set authentication
			authentication: {
				user: config.user,
				password: config.password
			}
		}, data);

		data = {data: data}; data[root] = data.data; delete data.data;

		// build the http request
		var reqOptions = url.parse(config.url);
		reqOptions.method = 'POST';
		reqOptions.headers = {'Content-Type': 'application/xml'};
		
		var req = https.request(reqOptions, function(res) {
			if(res.statusCode != 200)
				return callback('Request failed');

			res.setEncoding('utf8');

			var response = '';
			res.on('data', function (chunk) {
				response += chunk;
			});

			res.on('end', function() {
				parser.parseString(response, function(err, res){
					if(err)
						return callback(err);

					if(res.litleOnlineResponse.$.response == '1')
						return callback(res.litleOnlineResponse.$.message);

					delete res.litleOnlineResponse.$;
					return callback(null, res.litleOnlineResponse);
				});
			});
		});

		req.on('error', callback);

		req.write(builder.buildObject(data));
		req.end();
	};

	return self;
}


LitleOnlineRequest.prototype = {};


//////////////////////////////////
// Write any explicit services
//////////////////////////////////

LitleOnlineRequest.prototype.authorizationReversal = function(data, callback){
	return this._send({authReversal: map({
		$: {
			id: true,
			reportGroup: true,
			customerId: true
		},
		litleTxnId: true,
		amount: true,
		actionReason: true
	}, data)}, callback);
};

LitleOnlineRequest.prototype.authorization = function(data, callback){
	return this._send({authorization: map({
		$: {
			id: true,
			reportGroup: true,
			customerId: true
		},
		orderId: true,
		amount: true,
		orderSource: true,
		billToAddress: {
			name: true,
			addressLine1: true,
			city: true,
			state: true,
			zip: true,
			country: true,
			phone: true
		},
		card: {
			type: true,
			number: true,
			expDate: true,
			cardValidationNum: true
		},
		token: {
			litleToken: true
		}
	}, data)}, callback);
};

LitleOnlineRequest.prototype.sale = function(data, callback){
	return this._send({sale: map({
		$: {
			id: true,
			reportGroup: true,
			customerId: true
		},
		orderId: true,
		amount: true,
		orderSource: true,
		billToAddress: {
			name: true,
			addressLine1: true,
			city: true,
			state: true,
			zip: true,
			country: true,
			phone: true
		},
		token: {
			litleToken: true,
			expDate: true,
			cardValidationNum: true,
			type: true
		}
	}, data)}, callback);
};

LitleOnlineRequest.prototype.credit = function(data, callback){
	return this._send({credit: map({
		$: {
			id: true,
			reportGroup: true,
			customerId: true
		},
		litleTxnId: true,
		amount: true,
		actionReason: true
	}, data)}, callback);
};

//////////////////////////////////
// Auto build the other services
//////////////////////////////////

services.forEach(function(action){
	if(!LitleOnlineRequest.prototype[action])
		LitleOnlineRequest.prototype[action] = actionFactory(action);
});

module.exports = LitleOnlineRequest;
