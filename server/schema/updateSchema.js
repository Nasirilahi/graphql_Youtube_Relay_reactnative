// #!/usr/bin/env babel-node --optional es7.asyncFunctions
 
'use strict';

import fs from 'fs';
import path from 'path';
import {graphql}  from 'graphql';
import { schema } from './schema.js';
import { introspectionQuery, printSchema } from 'graphql/utilities';
 

 // Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(schema, introspectionQuery).then(result => {
  fs.writeFileSync(
    path.join(__dirname, './schema.json'),
    JSON.stringify(result, null, 2)
  );
});
 

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, './schema.graphql'),
  printSchema(schema)
);

console.log('Done. Restart React Native packager using: \n');
console.log('  react-native start --reset-cache\n');
