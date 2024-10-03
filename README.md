This is an unofficial SDK for the LitleCo/Vantiv payment processor.

See tests for usage examples.

Code Generation
---------------

This code makes heavy use of [jsonix](https://github.com/mitre/jsonix) to generate and apply mappings from the official LitleCo/Vantiv XSD files, previously available at https://github.com/LitleCo/litle-xml.

To add a new version, simply drop the XSD files in the `xsd` directory, add any relevant `jaxb` customizations to a file in the `bindings` directory, and run:

```bash
npm run generate
```