#!/usr/bin/env node

if (require.main == module) {
  if (process.argv.length > 2) {
    //Remove import args from the beginning.
    
  } else {
    console.log(`Usage: graphql-to-ts --schema <filename>`);
  }
}
