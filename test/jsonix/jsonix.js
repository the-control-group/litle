var Jsonix = require('jsonix').Jsonix;
var mapping = require('./testxsd.js').testxsd;
var context = new Jsonix.Context([mapping], {
	mappingStyle: 'simplified',
	namespacePrefixes: {
		'testxsd': ''
	}
});

var marshaller = context.createMarshaller();
var unmarshaller = context.createUnmarshaller();


console.log('\n\n- this is how the marshaller SHOULD work:');
console.log(marshaller.marshalString({
	name: {
		namespaceURI: 'testxsd',
		localPart: 'exampleElement'
	},
	value: {
		extId: '111',
		exampleId: '12345',
		aaa: 'some value'
	}
}));



console.log('\n\n- this is how the marshaller "works":');
console.log(marshaller.marshalString({
	name: {
		namespaceURI: 'testxsd',
		localPart: 'exampleElement'
	},
	value: {
		extId: '111',
		rest: [
			{exampleId: '12345'},
			{aaa: 'some value'}
		]
	}
}));



console.log('\n\n- the unmarshaller works fine:');
console.log(JSON.stringify(unmarshaller.unmarshalString(`
	<exampleElement xmlns="testxsd" extId="111">
		<exampleId>12345</exampleId>
		<aaa>some value</aaa>
	</exampleElement>
`)));


console.log('\n');
