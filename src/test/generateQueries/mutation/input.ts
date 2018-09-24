export const schema = `
  enum Status {
    Active,
    Disabled
  }

  type AccountDTO {
    name: String!,
    isAdmin: Boolean!
  }

  type ScuttlespaceUser {
    about: String,
    account: AccountDTO,
    domain: String,
    enabled: Boolean!,
    externalId: String!,
    pub: String!,
    rowid: ID!,
    username: String!,
    permissions: [PermissionDTO],
    status: Status
  }

  extend type Query {
    user(
      domain: String!, 
      externalId: String, 
      username: String
    ): ScuttlespaceUser!
  }

  extend type Mutation {
    addUser(
      name: String!,
      location: String!
    ): Boolean!
  }
`;

export const queries = `
mutation AddUser($nameArg: String, $locationArg: String!) {
  addUser(name: $nameArg, location: $locationArg)
}`;
