# graphql-to-ts

Generate TypeScript files from GraphQL Schemas.
This is an early release - and we handle only basic cases now.

## Installation

```bash
npm i graphql-to-ts
```

## Usage

```javascript
import * as codegen from "graphql-to-ts";

const graphqlTypes = `
  type ScuttlespaceUser {
    about: String
    rowid: ID!
    username: String!
  }
`;

const typescriptTypes = codegen.generateTypes(graphqlTypes)

/*
export interface IScuttleSpaceUser {
  about?: string | null;
  rowid: string;
  username: string;
}
*/
console.log(typescriptTypes);
`
```
