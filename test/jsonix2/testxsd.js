var testxsd_Module_Factory = function () {
  var testxsd = {
    name: 'testxsd',
    defaultElementNamespaceURI: 'testxsd',
    typeInfos: [],
    elementInfos: [{
        elementName: 'exampleElement',
        typeInfo: 'Long'
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