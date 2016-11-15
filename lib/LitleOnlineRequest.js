'use strict';

var _ = require('lodash');
var url = require('url');
var https = require('https');
var Jsonix = require('jsonix').Jsonix;

function LitleOnlineRequest (config, mapping) {
	var self = this;
	self._config = config;
	self._context = new Jsonix.Context([mapping], {
		mappingStyle: 'simplified',
		namespacePrefixes: {
			'http://www.litle.com/schema': ''
		}
	});

	mapping.elementInfos

	// only add methods for types that are valid choices for a baseRequest
	.filter(function(el) {
		return el.substitutionHead === 'transaction';
	})

	.forEach(function(el) {
		self[el.elementName] = function(data, callback) {
			this._send({
				transaction: {
					name: {
						namespaceURI: 'http://www.litle.com/schema',
						localPart: el.elementName,
					},
					value: data
				}
			}, callback);
		};
	});
}

LitleOnlineRequest.prototype._send = function _send(data, callback){

	// merge any configured data
	data = _.assign({

		// set top level attributes
		version: this._config.version,
		xmlns: 'http://www.litle.com/schema',
		merchantId: this._config.merchantId || this._config.currency_merchant_map.DEFAULT,

		// set authentication
		authentication: {
			user: this._config.user,
			password: this._config.password
		}

	}, data);

	data = {
		name: {
			namespaceURI: 'http://www.litle.com/schema',
			localPart: 'litleOnlineRequest'
		},
		value: data
	};

	var marshaller = this._context.createMarshaller();
	var unmarshaller = this._context.createUnmarshaller();

	// marshal the request body
	var requestBody = marshaller.marshalString(data);

	// build the http request
	var reqOptions = url.parse(this._config.url);
	reqOptions.method = 'POST';
	reqOptions.headers = {'Content-Type': 'application/xml'};

	var req = https.request(reqOptions, function(res) {
		if (res.statusCode != 200)
			return callback('Request failed');

		res.setEncoding('utf8');

		var response = '';
		res.on('data', function (chunk) {
			response += chunk;
		});

		res.on('end', function() {
			var responseBody;

			// unmarshal the response body
			try { responseBody = unmarshaller.unmarshalString(response); }
			catch (err) { return callback(err); }
				
			// check the response type
			if (!responseBody.litleOnlineResponse)
				return callback(new Error('Missing root litleOnlineResponse node.'));

			// check the response code
			if (responseBody.litleOnlineResponse.response == '1')
				return callback(new Error(responseBody.litleOnlineResponse.message));

			// return the successful response
			return callback(null, responseBody.litleOnlineResponse.transactionResponse);
		});
	});

	req.on('error', callback);

	// send the request body
	req.write(requestBody);

	req.end();
};


module.exports = LitleOnlineRequest;
