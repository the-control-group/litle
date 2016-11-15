'use strict';

const fs = require('fs');
const spawn = require('child_process').spawn;

// get a list of xsd files
fs.readdirSync('./xsd')
	.map((filename) => filename.match(/^(.+)_v([0-9]+\.[0-9]+)\.xsd$/))
	.filter((x) => x)
	.forEach((x) => {
		const [filename, pkgName, pkgVersion] = x;
		const child = spawn('java', [
			'-jar', 'node_modules/jsonix/lib/jsonix-schema-compiler-full.jar',

			// output to the mappings directory
			'-d', 'mappings',

			// generate a compliant package name
			'-p', `${pkgName}_v${pkgVersion.replace('.', '_')}`,

			// only log errors
			'-logLevel', 'ERROR',

			// the xsd file to use
			`xsd/${filename}`,
		]);

		// The jsonix-schema-compiler CLI uses neither exit codes or stderr to inform
		// the parent process of an error, so we're instead setting the log level to
		// error and assuming that the presence of any logs indicate a failure.
		var code = 0;
		child.stdout.on('data', (data) => {
			code = 1;
			console.error(`${filename}: ${data}`);
		});

		child.on('close', () => {
			if (code) {
				return console.error(`✗ - Failed to generate mapping from ${filename}.`);
			}

			return console.log(`✓ - Generated mapping from ${filename}.`);
		});
	});
