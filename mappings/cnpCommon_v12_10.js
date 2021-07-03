var cnpCommon_v12_10_Module_Factory = function () {
  var cnpCommon_v12_10 = {
    name: 'cnpCommon_v12_10',
    defaultElementNamespaceURI: 'http:\/\/www.vantivcnp.com\/schema',
    typeInfos: [{
        localName: 'Authentication',
        typeName: null,
        propertyInfos: [{
            name: 'user',
            required: true
          }, {
            name: 'password',
            required: true
          }]
      }, {
        localName: 'GiftCardCardType',
        typeName: 'giftCardCardType',
        baseTypeInfo: '.CardType'
      }, {
        localName: 'TokenResponseType',
        typeName: 'tokenResponseType',
        propertyInfos: [{
            name: 'cnpToken'
          }, {
            name: 'tokenResponseCode',
            required: true
          }, {
            name: 'tokenMessage',
            required: true
          }, {
            name: 'type'
          }, {
            name: 'bin'
          }, {
            name: 'eCheckAccountSuffix'
          }]
      }, {
        localName: 'CardType',
        typeName: 'cardType',
        propertyInfos: [{
            name: 'track',
            required: true
          }, {
            name: 'type',
            required: true
          }, {
            name: 'number'
          }, {
            name: 'expDate'
          }, {
            name: 'cardValidationNum'
          }, {
            name: 'pin'
          }]
      }, {
        localName: 'CardTokenType',
        typeName: 'cardTokenType',
        propertyInfos: [{
            name: 'tokenURL',
            required: true
          }, {
            name: 'cnpToken',
            required: true
          }, {
            name: 'expDate'
          }, {
            name: 'cardValidationNum'
          }, {
            name: 'type'
          }, {
            name: 'checkoutId'
          }]
      }, {
        localName: 'LodgingCharge',
        typeName: null,
        propertyInfos: [{
            name: 'name',
            required: true
          }]
      }, {
        localName: 'MposType',
        typeName: 'mposType',
        propertyInfos: [{
            name: 'ksn',
            required: true
          }, {
            name: 'formatId',
            required: true
          }, {
            name: 'encryptedTrack',
            required: true
          }, {
            name: 'track1Status',
            required: true,
            typeInfo: 'Int'
          }, {
            name: 'track2Status',
            required: true,
            typeInfo: 'Int'
          }]
      }, {
        localName: 'AdvancedFraudChecksType',
        typeName: 'advancedFraudChecksType',
        propertyInfos: [{
            name: 'threatMetrixSessionId',
            typeInfo: 'Token'
          }, {
            name: 'webSessionId',
            typeInfo: 'Token'
          }, {
            name: 'customAttribute1'
          }, {
            name: 'customAttribute2'
          }, {
            name: 'customAttribute3'
          }, {
            name: 'customAttribute4'
          }, {
            name: 'customAttribute5'
          }]
      }, {
        localName: 'BillToAddress',
        typeName: 'contact',
        propertyInfos: [{
            name: 'name'
          }, {
            name: 'firstName'
          }, {
            name: 'middleInitial'
          }, {
            name: 'lastName'
          }, {
            name: 'companyName'
          }, {
            name: 'addressLine1'
          }, {
            name: 'addressLine2'
          }, {
            name: 'addressLine3'
          }, {
            name: 'city'
          }, {
            name: 'state'
          }, {
            name: 'zip'
          }, {
            name: 'country'
          }, {
            name: 'email'
          }, {
            name: 'phone'
          }]
      }, {
        localName: 'CardPaypageType',
        typeName: 'cardPaypageType',
        propertyInfos: [{
            name: 'paypageRegistrationId',
            required: true
          }, {
            name: 'expDate'
          }, {
            name: 'cardValidationNum'
          }, {
            name: 'type'
          }]
      }, {
        localName: 'AdvancedFraudResultsType',
        typeName: 'advancedFraudResultsType',
        propertyInfos: [{
            name: 'deviceReviewStatus'
          }, {
            name: 'deviceReputationScore',
            typeInfo: 'Int'
          }, {
            name: 'triggeredRules',
            minOccurs: 0,
            collection: true,
            elementName: 'triggeredRule'
          }]
      }, {
        type: 'enumInfo',
        localName: 'IIASFlagType',
        values: ['Y']
      }, {
        type: 'enumInfo',
        localName: 'CountryTypeEnum',
        values: ['USA', 'AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CW', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'TL', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'AN', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'BL', 'KN', 'LC', 'MF', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'ES', 'LK', 'SH', 'PM', 'SD', 'SR', 'SJ', 'SZ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', 'VA', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW', 'RS', 'ME', 'SS']
      }, {
        type: 'enumInfo',
        localName: 'LodgingExtraChargeEnum',
        values: ['RESTAURANT', 'GIFTSHOP', 'MINIBAR', 'TELEPHONE', 'OTHER', 'LAUNDRY']
      }, {
        type: 'enumInfo',
        localName: 'CurrencyCodeEnum',
        values: ['AUD', 'CAD', 'CHF', 'DKK', 'EUR', 'GBP', 'HKD', 'JPY', 'NOK', 'NZD', 'SEK', 'SGD', 'USD']
      }, {
        type: 'enumInfo',
        localName: 'LodgingProgramCodeType',
        values: ['LODGING', 'NOSHOW', 'ADVANCEDDEPOSIT']
      }, {
        type: 'enumInfo',
        localName: 'YesNoType',
        values: ['Y', 'N']
      }, {
        type: 'enumInfo',
        localName: 'GovtTaxTypeEnum',
        values: ['payment', 'fee']
      }],
    elementInfos: [{
        elementName: 'authentication',
        typeInfo: '.Authentication'
      }, {
        elementName: 'billToAddress',
        typeInfo: '.BillToAddress'
      }, {
        elementName: 'lodgingCharge',
        typeInfo: '.LodgingCharge'
      }]
  };
  return {
    cnpCommon_v12_10: cnpCommon_v12_10
  };
};
if (typeof define === 'function' && define.amd) {
  define([], cnpCommon_v12_10_Module_Factory);
}
else {
  var cnpCommon_v12_10_Module = cnpCommon_v12_10_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.cnpCommon_v12_10 = cnpCommon_v12_10_Module.cnpCommon_v12_10;
  }
  else {
    var cnpCommon_v12_10 = cnpCommon_v12_10_Module.cnpCommon_v12_10;
  }
}