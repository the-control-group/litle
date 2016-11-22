var testxsd_Module_Factory = function () {
  var testxsd = {
    name: 'testxsd',
    defaultElementNamespaceURI: 'testxsd',
    typeInfos: [{
        localName: 'ExtensionType',
        typeName: 'extensionType',
        propertyInfos: [{
            name: 'extId',
            attributeName: {
              localPart: 'extId'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ExampleElement',
        typeName: null,
        baseTypeInfo: '.ExtensionType',
        propertyInfos: [{
            name: 'exampleName',
            required: true
          }, {
            name: 'exampleId',
            required: true
          }, {
            name: 'constant'
          }, {
            name: 'aaa',
            required: true
          }, {
            name: 'bbb'
          }]
      }],
    elementInfos: [{
        elementName: 'exampleElement',
        typeInfo: '.ExampleElement'
      }]
  };
  return {
    testxsd: testxsd
  };
};
if (typeof define === 'function' && define.amd) {
  define([], testxsd_Module_Factory);
}
else {
  var testxsd_Module = testxsd_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.testxsd = testxsd_Module.testxsd;
  }
  else {
    var testxsd = testxsd_Module.testxsd;
  }
}