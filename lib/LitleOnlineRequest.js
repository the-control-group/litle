'use strict';

var url = require('url');
var https = require('https');
var Jsonix = require('jsonix').Jsonix;

function LitleOnlineRequest (config, mapping) {
	var self = this;


	// Here we override the Long type to use strings, since javascript has a number precision
	// limit of 32 bits, which causes silent truncation of significant values. See bug at
	// https://github.com/highsource/jsonix-schema-compiler/issues/77
	mapping = Object.assign({}, mapping, {typeInfos: [
		new (Jsonix.Class(Jsonix.Schema.XSD.String, {
			name : 'Long',
			typeName : Jsonix.Schema.XSD.qname('long'),
			CLASS_NAME : 'Long'
		}))()
	].concat(mapping.typeInfos)});

	self._config = config;

	var jsonixConfig = {
		mappingStyle: 'simplified',
		namespacePrefixes: {
			'http://www.litle.com/schema': ''
		}
	};

	self._context = new Jsonix.Context([mapping], jsonixConfig);

	mapping.elementInfos

	// only add methods for types that are valid choices for a baseRequest
	.filter(function(el) {
		return el.substitutionHead === 'transaction';
	})

	.forEach(function(el) {
		self[el.elementName] = function(data, callback) {
			self._send({
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
	var self = this;

	// merge any configured data
	data = Object.assign({

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

	var requestBody;

	// marshal the request body
	try { requestBody = marshaller.marshalString(data); }
	catch (err) { return callback(err); }

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
			if (responseBody.litleOnlineResponse.response === '1')
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
