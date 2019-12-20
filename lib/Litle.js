'use strict';

var LitleOnlineRequest = require('./LitleOnlineRequest.js');

function Litle(config) {
	config = config || {};

	if(!(this instanceof Litle))
		return new Litle(config);

	// merge configs and defaults
	this._config = {
		user: config.user,
		password: config.password,
		currency_merchant_map: config.currency_merchant_map || { DEFAULT: 'default' },
		default_report_group: config.default_report_group || 'Default Report Group',
		url: config.url || 'https://payments.vantivcnp.com/vap/communicator/online',
		proxy_addr: config.proxy_addr || null,
		proxy_port: config.proxy_port || null,
		version: config.version || '9.10',
		timeout: config.timeout || 65,
		log: (typeof config.log == 'boolean') ? config.log : false,
		merchantId: config.merchantId || 'default'
	};

	// import the mappings for the specified version
	var v = ('' + this._config.version).replace('.', '_');
	this._mappings = {
		litleBatch: require('../mappings/litleBatch_v' + v)['litleBatch_v' + v],
		litleOnline: require('../mappings/litleOnline_v' + v)['litleOnline_v' + v],
	};

	// add support for online requests
	this.litleOnlineRequest = new LitleOnlineRequest(this._config, this._mappings.litleOnline);

	// TODO: support batch processing?
}

module.exports = Litle;
