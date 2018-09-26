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
`;

export const queries = `
query User($domainArg: String!, $externalIdArg: String, $usernameArg: String) {
  user(domain: $domainArg, externalId: $externalIdArg, username: $usernameArg) {
    account {
      name,
      isAdmin
    }
  }
}`;
