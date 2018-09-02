export default `
  input CreateOrRenameUserArgs {
    externalId: String!
    pub: String!
    username: String!
  }

  type CreateOrRenameUserResult {
    status: String!
  }

  input ChangeUserStatusArgs {
    externalId: String!
  }

  type ChangeUserStatusResult {
    username: String!
  }

  extend type Mutation {
    createOrRenameUser(input: CreateOrRenameUserArgs): CreateOrRenameUserResult!
    enableUser(input: ChangeUserStatusArgs): ChangeUserStatusResult!
    disableUser(input: ChangeUserStatusArgs): ChangeUserStatusResult!
    destroyUser(input: ChangeUserStatusArgs): ChangeUserStatusResult!
  }
`;
