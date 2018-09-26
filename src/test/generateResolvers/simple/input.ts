export default `
  type ScuttlespaceUser {
    about: String
    domain: String
    enabled: Boolean!
    externalId: String!
    pub: String!
    rowid: ID!
    username: String!
    permissions: [Permission]
  }

  type Permission {
    rowid: ID!
    assigner: ScuttlespaceUser!
    assignee: ScuttlespaceUser!
    permissions: String
  }

  enum CreateOrRenameUserStatus {
    Created,
    Own,
    Renamed,
    Taken
  }

  extend type Query {
    user(domain: String, externalId: String, username: String): ScuttlespaceUser
  }

  input CreateOrRenameUserArgs {
    externalId: String!
    pub: String!
    username: String!
  }

  type CreateOrRenameUserResult {
    externalId: String!
    status: CreateOrRenameUserStatus!
  }

  input ChangeUserStatusArgs {
    externalId: String!
  }

  type ChangeUserStatusResult {
    username: String!
  }

  extend type Mutation {
    createOrRenameUser(input: CreateOrRenameUserArgs!): CreateOrRenameUserResult!
    enableUser(input: ChangeUserStatusArgs!): ChangeUserStatusResult!
    disableUser(input: ChangeUserStatusArgs!): ChangeUserStatusResult!
    destroyUser(input: ChangeUserStatusArgs!): ChangeUserStatusResult!
  }
`;
