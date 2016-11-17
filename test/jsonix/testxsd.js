var testxsd_Module_Factory = function () {
  var testxsd = {
  name: 'testxsd',
  defaultElementNamespaceURI: 'testxsd',
  typeInfos: [
    {
      localName: 'ExampleElement',
      typeName: null,
      baseTypeInfo: '.ExtensionType',
      propertyInfos: [
        { name: 'aaa' },
        { name: 'exampleId' },
        { name: 'bbb' },
        { name: 'constant' },
        { name: 'exampleName' }
      ]
    },
    {
      localName: 'ExtensionType',
      typeName: 'extensionType',
      propertyInfos: [
        {
          name: 'extId',
          attributeName:
          {
            localPart: 'extId'
          },
          type: 'attribute'
        }
      ]
    }
  ],
  elementInfos: [
    {
      elementName: 'exampleName',
      scope: '.ExampleElement'
    },
    {
      elementName: 'bbb',
      scope: '.ExampleElement'
    },
    {
      elementName: 'exampleId',
      scope: '.ExampleElement'
    },
    {
      elementName: 'constant',
      scope: '.ExampleElement'
    },
    {
      elementName: 'aaa',
      scope: '.ExampleElement'
    },
    {
      typeInfo: '.ExampleElement',
      elementName: 'exampleElement'
    }
  ]
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