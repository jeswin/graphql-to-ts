# graphql-to-ts

This module is intended for people writing code generation tools and is not meant to be used directly. If you're looking to quickly convert GraphQL to TypeScript, use the companion project graphql-to-ts-cli.

## Installation

```bash
npm install graphql-to-ts
```

For CLI tools

```bash
npm install graphql-to-ts
```

## Limitations

Fragments and polymorphism are not supported yet. Pull requests welcome.

## API

The best way to learn the API will be by looking at the tests. They are sufficiently easy to follow.

### getTypes()

Converts various GraphQL types (such as types, enums, input types) to TypeScript interfaces.

```js
const schema = `
  type PermissionDTO {
    resource: String!
    allow: Boolean!
  }

  type ScuttlespaceUser {
    about: String
    domain: String
    enabled: Boolean!
    externalId: String!
    pub: String!
    rowid: ID!
    username: String!
    permissions: [PermissionDTO]
  }
`;

const result = getTypes(schema));

// Returns the following.

result = {
  interfaces: [
    {
      name: "IPermissionDTO",
      graphqlType: "PermissionDTO",
      extension: false,
      fields: [
        {
          name: "resource",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "allow",
          type: { kind: "Scalar", type: "boolean", nullable: false }
        }
      ],
      index: 0,
      gql: "type PermissionDTO {\n  resource: String!\n  allow: Boolean!\n}"
    },
    {
      name: "IScuttlespaceUser",
      graphqlType: "ScuttlespaceUser",
      extension: false,
      fields: [
        {
          name: "about",
          type: { kind: "Scalar", type: "string", nullable: true }
        },
        {
          name: "domain",
          type: { kind: "Scalar", type: "string", nullable: true }
        },
        {
          name: "enabled",
          type: { kind: "Scalar", type: "boolean", nullable: false }
        },
        {
          name: "externalId",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "pub",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "rowid",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "username",
          type: { kind: "Scalar", type: "string", nullable: false }
        },
        {
          name: "permissions",
          type: {
            kind: "List",
            type: { kind: "Scalar", type: "IPermissionDTO", nullable: true },
            nullable: true
          }
        }
      ],
      index: 1,
      gql:
        "type ScuttlespaceUser {\n  about: String\n  domain: String\n  enabled: Boolean!\n  externalId: String!\n  pub: String!\n  rowid: ID!\n  username: String!\n  permissions: [PermissionDTO]\n}"
    }
  ],
  enums: []
};
```

## getQueries()

Converts GraphQL queries into TypeScript interfaces.

```js
const schema = `--see previous--`;
const queries = `
  mutation AddUser($nameArg: String, $locationArg: String!) {
    addUser(name: $nameArg, location: $locationArg)
  }
`;

const result = lib.getQueries(queries, schema);

// Returns the following.

result = {
  queries: [],
  mutations: [
    {
      index: 0,
      name: "AddUser",
      selections: [
        {
          name: "addUser",
          arguments: [
            { name: "name", value: "nameArg" },
            { name: "location", value: "locationArg" }
          ],
          type: {
            kind: "Scalar",
            nullable: false,
            type: "boolean"
          }
        }
      ],
      variables: [
        {
          name: "nameArg",
          type: { kind: "Scalar", type: "string", nullable: true }
        },
        {
          name: "locationArg",
          type: { kind: "Scalar", type: "string", nullable: false }
        }
      ],
      gql:
        "mutation AddUser($nameArg: String, $locationArg: String!) {\n  addUser(name: $nameArg, location: $locationArg)\n}"
    }
  ]
};
```
